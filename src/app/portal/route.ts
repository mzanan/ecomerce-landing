import { CustomerPortal } from "@polar-sh/nextjs";

export const GET = CustomerPortal({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  getCustomerId: () => Promise.resolve(""),
  server: process.env.NODE_ENV === "production" ? "production" : "sandbox",
}); 