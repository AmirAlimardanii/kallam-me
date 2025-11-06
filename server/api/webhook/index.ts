import Stripe from "stripe";
import { stripe } from "~/server/utils/stripe";
import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const signature = getHeader(event, "Stripe-Signature") as string;
  const body = await readRawBody(event);

  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      //@ts-ignore
      body,
      signature,
      useRuntimeConfig().stripeWebhookSecret
    );
  } catch (error) {
    console.log(error, "error");
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid signature",
    });
  }

  const session = stripeEvent.data.object as Stripe.Checkout.Session;

  const address = session.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");

  if (stripeEvent.type === "checkout.session.completed") {
    const order = await db.order.update({
      where: {
        id: session.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session.customer_details?.phone || "",
      },
      include: {
        orderItems: true,
      },
    });

    const productIds = order.orderItems.map((item) => item.productId);
  }

  return 200;
});
