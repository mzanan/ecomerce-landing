import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
    console.log("Webhook payload received:", payload);
  },
  onCheckoutCreated: async (payload) => {
    console.log("Checkout created:", payload);
  },
  onOrderCreated: async (payload) => {
    console.log("Order created:", payload);
  }
}); 