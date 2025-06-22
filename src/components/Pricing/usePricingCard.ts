import { useState, useCallback, useEffect, useRef } from "react"
import { usePolarEmbedded } from "@/hooks/usePolarEmbedded"
import { usePolarProducts } from "@/hooks/usePolarProducts"
import { toast } from "sonner"

interface UsePricingCardProps {
  productKey: 'launch-ready' | 'custom-pro'
  planName: string
}

export const usePricingCard = ({ productKey, planName }: UsePricingCardProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { openCheckout } = usePolarEmbedded()
  const { getProductPrice } = usePolarProducts()
  const listenerAttached = useRef(false)

  useEffect(() => {
    if (listenerAttached.current) return;

    const handleCheckoutClose = () => {
      setIsLoading(false)
    }

    const handleCheckoutSuccess = () => {
      setIsLoading(false)
    }

    window.addEventListener('polar-checkout-closed', handleCheckoutClose, { passive: true })
    window.addEventListener('polar-checkout-success', handleCheckoutSuccess, { passive: true })
    
    listenerAttached.current = true;

    return () => {
      window.removeEventListener('polar-checkout-closed', handleCheckoutClose)
      window.removeEventListener('polar-checkout-success', handleCheckoutSuccess)
      listenerAttached.current = false;
    }
  }, [])

  const handleGetStarted = useCallback(async () => {
    
    try {
      setIsLoading(true)
      const priceId = await getProductPrice(productKey)
      
      if (!priceId) {
        console.error('❌ Price not found for:', productKey);
        toast.error('Price not found')
        setIsLoading(false)
        return
      }

      await openCheckout({
        priceId,
        metadata: {
          plan: planName
        }
      })
      
      setIsLoading(false)
      
    } catch (error) {
      console.error('❌ Error during checkout:', error)
      toast.error('Failed to open checkout')
      setIsLoading(false)
    }
  }, [productKey, planName, openCheckout, getProductPrice, isLoading])

  return { handleGetStarted, isLoading }
} 