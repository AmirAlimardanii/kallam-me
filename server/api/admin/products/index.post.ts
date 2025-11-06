import { productSchema } from "~/utils/validation";
import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const session = await getUserSession(event);

  if (session.user && session.user.role === "ADMIN") {
    const {
      name,
      images,
      categoryId,
      colorId,
      sizeId,
      price,
      isFeatured,
      isArchived,
    } = await readValidatedBody(event, (body) => productSchema.parse(body));

    const products = await db.product.create({
      data: {
        userId: session.user.id,
        name,
        images: {
          createMany: {
            data: [...images.map((img) => img)],
          },
        },
        categoryId,
        colorId,
        sizeId,
        price,
        isFeatured,
        isArchived,
      },
    });

    return products;
  } else {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized. You dont have admin permission",
    });
  }
});
