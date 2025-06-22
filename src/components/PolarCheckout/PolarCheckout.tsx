import { PrimaryButton } from "@/components/styles/buttons";
import { usePolar } from "@/hooks/usePolar";

interface PolarCheckoutProps {
  productPriceId: string;
  buttonText?: string;
  className?: string;
}

export default function PolarCheckout({ 
  productPriceId, 
  buttonText = "Buy Now",
  className 
}: PolarCheckoutProps) {
  const { createCheckout, isLoading, error } = usePolar();

  const handleCheckout = () => {
    createCheckout({
      productPriceId,
      successUrl: `${window.location.origin}/confirmation?checkout_id={CHECKOUT_ID}`,
    });
  };

  return (
    <div className={className}>
      <PrimaryButton 
        onClick={handleCheckout}
        isLoading={isLoading}
        loadingText="Processing..."
        fullWidth
      >
        {buttonText}
      </PrimaryButton>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
} 