import { CustomerPortal } from "@polar-sh/nextjs";
import { getAccessToken, getServer } from "@/lib/polar";

export const GET = CustomerPortal({
  accessToken: getAccessToken(),
  getCustomerId: () => Promise.resolve(""),
  server: getServer(),
}); 