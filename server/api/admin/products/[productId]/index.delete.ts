import db from "~/utils/db";
import { imageResourceName } from "~/utils";
import { deleteResourceFromCloudinary } from "~/server/utils/cloudinary";

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const session = await getUserSession(event);

  if (session.user && session.user.role === "ADMIN") {
    const product = await db.product.findUnique({
      where: {
        id: event.context.params?.productId,
        userId: session.user.id,
      },
      include: {
        images: true,
      },
    });

    if (!product) {
      throw createError({
        statusCode: 404,
        statusMessage: "Product not found",
      });
    }

    for (const image of product.images) {
      const name = imageResourceName(image.url);
      if (name) {
        await deleteResourceFromCloudinary(name);
      }
    }

    const deleteProduct = await db.product.delete({
      where: {
        id: event.context.params?.productId,
        userId: session.user.id,
      },
      include: {
        images: true,
      },
    });

    return deleteProduct;
  } else {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized. You dont have admin permission",
    });
  }
});
