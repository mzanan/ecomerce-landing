import { useCallback, useEffect } from "react";
import { PolarEmbedCheckout } from "@polar-sh/checkout/embed";

interface EmbeddedCheckoutOptions {
  productId?: string;
  priceId?: string;
  customerId?: string;
  customerEmail?: string;
  customerName?: string;
  metadata?: Record<string, string>;
  theme?: "light" | "dark";
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function usePolarEmbedded() {
  useEffect(() => {
    PolarEmbedCheckout.init();
  }, []);

  const openCheckout = useCallback(async (options: EmbeddedCheckoutOptions) => {
    try {
      const params = new URLSearchParams();
      if (options.priceId) params.append("price_id", options.priceId);
      if (options.metadata)
        params.append("metadata", encodeURIComponent(JSON.stringify(options.metadata)));

      const resp = await fetch(`/checkout?${params.toString()}`);
      if (!resp.ok) throw new Error("Failed to create checkout session");

      const data = await resp.json();
      if (!data.url) throw new Error("No checkout URL received");

      const checkout = await PolarEmbedCheckout.create(data.url, options.theme || "light");

      checkout.addEventListener("close", (ev) => {
        window.dispatchEvent(new CustomEvent("polar-checkout-close", { detail: ev.detail }));
      });
      checkout.addEventListener("success", (ev) => {
        window.dispatchEvent(new CustomEvent("polar-checkout-success", { detail: ev.detail }));
      });

    // — Patch to silence NotFoundError when closing —         
    const origClose = checkout.close.bind(checkout);
      checkout.close = () => {
        try {
          origClose();
        } catch (err: unknown) {
          if (err instanceof Error && err.name === "NotFoundError") {
            console.warn("Polar modal close triggered NotFoundError — ignorado");
            return;
          }
          throw err;
        }
      };

      return checkout;
    } catch (e) {
      console.error("Error opening checkout:", e);
      throw e;
    }
  }, []);

  return { openCheckout };
}