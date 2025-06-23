import { useState, useCallback, useEffect, useRef } from "react"
import { usePolarEmbedded } from "@/hooks/usePolarEmbedded"
import { usePolarProducts } from "@/hooks/usePolarProducts"
import { toast } from "sonner"

interface UsePricingCardProps {
  productKey: 'launch-ready' | 'custom-pro'
  planName: string
}

const PRODUCT_NAMES = {
  'launch-ready': 'Launch Ready',
  'custom-pro': 'Custom Pro'
} as const;

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

  const handleGetStarted = useCallback(async () => {
    if (productsLoading) {
      toast.error('Loading products, please wait...')
      return
    }

    if (products.length === 0) {
      toast.error('No products available')
      return
    }

    try {
      setIsLoading(true)
      
      const productName = PRODUCT_NAMES[productKey]
      const product = getProductByName(productName)
      
      if (!product) {
        console.error('❌ Product not found for:', productKey, 'with name:', productName);
        console.log('📋 Available products:', products.map(p => p.name));
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

      console.log('🚀 Opening checkout for:', productName, 'with price:', priceId);

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