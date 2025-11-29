import { useState, useEffect, useCallback } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface CartItem {
  variantId: string;
  productId: string;
  quantity: number;
  price?: number;
  size: string;
  name: string;
}

interface AddressFormValues {
  name: string;
  email: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

interface UseStripePaymentProps {
  cartItems: CartItem[];
  getTotalPrice: () => number;
  shippingPrice?: number;
  watchedValues: AddressFormValues;
  isHydrated: boolean;
  clearCart: () => void;
}

export function useStripePayment({
  cartItems,
  getTotalPrice,
  shippingPrice,
  watchedValues,
  isHydrated,
  clearCart,
}: UseStripePaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentInitialized, setPaymentIntentInitialized] = useState(false);
  const [isWaitingForShipping, setIsWaitingForShipping] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const getTotalWithShipping = useCallback(() => {
    const subtotal = getTotalPrice();
    const shipping = shippingPrice || 0;
    return subtotal + shipping;
  }, [getTotalPrice, shippingPrice]);

  const initializePaymentIntent = useCallback(async () => {
    const currentEmail = watchedValues.email;
    const totalWithShipping = getTotalWithShipping();

    if (paymentIntentInitialized) return;

    if (watchedValues.country && (shippingPrice === undefined || shippingPrice === null)) {
      console.warn('[CHECKOUT] Shipping price not loaded yet for country:', watchedValues.country);
      return;
    }

    if (cartItems.length === 0 || totalWithShipping <= 0) {
      console.warn('[CHECKOUT] Cannot initialize payment: invalid cart or total');
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      const orderItems = cartItems.map(item => ({
        variantId: item.variantId,
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: item.price || 0,
        size: item.size,
        name: item.name
      }));

      const amountInCents = Math.round(totalWithShipping * 100);

      const response = await fetch('/api/checkout-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountInCents,
          currency: 'usd',
          email: currentEmail,
          items: orderItems,
        }),
      });

      const data = await response.json();

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setPaymentIntentInitialized(true);
        setPaymentError(null);
      } else {
        throw new Error(data.error || "Failed to initialize payment.");
      }
    } catch (error: unknown) {
      console.error('[CHECKOUT] Error initializing payment intent:', error);
      setPaymentError(`Payment initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  }, [
    watchedValues.email,
    watchedValues.country,
    cartItems,
    getTotalWithShipping,
    shippingPrice,
    paymentIntentInitialized
  ]);

  useEffect(() => {
    const isWaitingShipping = Boolean(watchedValues.country && shippingPrice === undefined);
    setIsWaitingForShipping(isWaitingShipping);

    if (watchedValues.country) {
      setPaymentError(null);
    }

    const isValidEmail = watchedValues.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedValues.email);

    const shouldInitialize = (
      isHydrated &&
      isValidEmail &&
      cartItems.length > 0 &&
      (!watchedValues.country || (watchedValues.country && shippingPrice !== undefined))
    );

    if (shouldInitialize && !paymentIntentInitialized) {
      initializePaymentIntent();
    }
  }, [
    watchedValues.email,
    watchedValues.country,
    cartItems.length,
    paymentIntentInitialized,
    shippingPrice,
    isHydrated,
    initializePaymentIntent
  ]);

  const processPayment = useCallback(async (addressData: AddressFormValues) => {
    if (!stripe || !elements || !clientSecret) {
      setPaymentError(
        !clientSecret ? "Payment session not initialized. Please wait or refresh." :
        "Stripe.js has not loaded yet. Please wait."
      );
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setPaymentError("Card details not found. Please ensure card information is entered correctly.");
      return;
    }

    if (cartItems.length === 0) {
      setPaymentError("Your cart is empty.");
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: addressData.name,
            address: {
              line1: addressData.address1,
              line2: addressData.address2 || undefined,
              city: addressData.city,
              state: addressData.state,
              postal_code: addressData.postalCode,
              country: addressData.country,
            },
            phone: addressData.phone || undefined,
          },
        },
      });

      if (error) {
        setPaymentError(error.message || "An unexpected payment error occurred.");
        router.push('/checkout/cancel');
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        const orderItems = cartItems.map(item => ({
          variantId: item.variantId,
          productId: item.productId,
          quantity: item.quantity,
          priceAtPurchase: item.price || 0,
          size: item.size,
          name: item.name
        }));

        const saveResponse = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            shippingAddress: addressData,
            items: orderItems,
            totalAmount: getTotalWithShipping(),
            paymentIntentId: paymentIntent.id,
            shippingPrice: shippingPrice || 0,
          }),
        });

        const orderData = await saveResponse.json();

        if (orderData.orderId) {
          toast.success("Payment successful!");
          clearCart();
          router.push(`/checkout/success?order_id=${orderData.orderId}&pi_id=${paymentIntent.id}`);
        } else {
          toast.error(orderData.error || "Payment succeeded but failed to save order. Please contact support.");
        }
      } else {
        setPaymentError("Payment did not succeed. Status: " + paymentIntent?.status);
        setTimeout(() => router.push('/checkout/cancel'), 2000);
      }
    } catch (generalError: unknown) {
      console.error('Payment processing error:', generalError);
      setPaymentError("An unexpected error occurred while processing payment.");
      setTimeout(() => router.push('/checkout/cancel'), 3000);
    } finally {
      setIsProcessing(false);
    }
  }, [stripe, elements, clientSecret, cartItems, getTotalWithShipping, shippingPrice, clearCart, router]);

  return {
    isProcessing,
    paymentError,
    clientSecret,
    isWaitingForShipping,
    processPayment,
    stripe,
    elements,
  };
}
