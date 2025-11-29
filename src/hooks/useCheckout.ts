import { useState, useCallback } from "react";

interface CheckoutOptions {
  priceId?: string;
  amount?: number;
  customerEmail?: string;
  metadata?: Record<string, string>;
}

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckout = useCallback(async (options: CheckoutOptions) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: options.amount || 1000,
          currency: 'usd',
          email: options.customerEmail,
          metadata: options.metadata,
        }),
      });

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