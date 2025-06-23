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
  const { products, isLoading: productsLoading, getProductByName, getProductPrice } = usePolarProducts()
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

  const getProductName = (key: string) => {
    return key === 'launch-ready' ? 'Launch Ready' : 'Custom Pro'
  }

  const handleGetStarted = useCallback(async () => {
    if (productsLoading || products.length === 0) {
      toast.error('Loading products, please wait...')
      return
    }

    try {
      setIsLoading(true)
      
      const productName = getProductName(productKey)
      const product = getProductByName(productName)
      
      if (!product) {
        console.error('❌ Product not found for:', productKey, productName);
        toast.error('Product not found')
        setIsLoading(false)
        return
      }

      const priceId = getProductPrice(product)
      
      if (!priceId) {
        console.error('❌ Price not found for product:', product);
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
  }, [productKey, planName, openCheckout, getProductByName, getProductPrice, productsLoading, products])

  return { 
    handleGetStarted, 
    isLoading: isLoading || productsLoading 
  }
} 