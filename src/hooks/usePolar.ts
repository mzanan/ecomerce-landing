import { useState, useCallback } from "react";

interface PolarCheckoutOptions {
  productPriceId: string;
  customerId?: string;
  successUrl?: string;
  metadata?: Record<string, string>;
}

export function usePolar() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckout = useCallback(async (options: PolarCheckoutOptions) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        product_price_id: options.productPriceId,
        ...(options.customerId && { customer_id: options.customerId }),
        ...(options.successUrl && { success_url: options.successUrl }),
        ...(options.metadata && { metadata: JSON.stringify(options.metadata) }),
      });

      const response = await fetch(`/checkout?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createCheckout,
    isLoading,
    error,
  };
} 