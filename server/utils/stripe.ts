import Stripe from "stripe";

export const stripe = new Stripe(useRuntimeConfig().stripeSecret, {
  apiVersion: "2024-06-20",
  typescript: true,
});
