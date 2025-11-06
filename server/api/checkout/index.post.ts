import { stripe } from "~/server/utils/stripe";
import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const productIds = await readBody(event);

  if (!productIds || !productIds.length) {
    throw createError({
      statusCode: 400,
      statusMessage: "empty cart",
    });
  }

  const products = await db.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const order = await db.order.create({
    data: {
      isPaid: false,
      orderItems: {
        create: productIds.map((id: string) => ({
          product: {
            connect: {
              id: id,
            },
          },
        })),
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items: products.map((product) => {
      return {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
      };
    }),
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `http://localhost:3000/cart?success=1`,
    cancel_url: `http://localhost:3000/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  return session.url;
});
