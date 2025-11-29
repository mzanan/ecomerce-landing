import { useCallback } from "react"
import { useProducts } from "@/hooks/useProducts"
import { useCheckout } from "@/hooks/useCheckout"
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
  const { products, isLoading: productsLoading } = useProducts()
  const { createCheckout, isLoading: checkoutLoading } = useCheckout()

  const getButtonText = () => {
    if (planName === "Launch Ready") {
      return "Start Launch Ready"
    }
    return "Request Custom Pro"
  }


  const handleGetStarted = useCallback(async () => {
    if (productsLoading) {
      toast.error('Loading products, please wait...')
      return
    }

    if (products.length === 0) {
      toast.error('No products available')
      return
    }
      
      const productName = PRODUCT_NAMES[productKey]
    const product = products.find(p => p.name === productName)
      
      if (!product) {
      console.error('Product not found for:', productKey, 'Expected name:', productName, 'Available products:', products.map(p => p.name))
        toast.error('Product not found')
        return
      }

    const price = product.prices?.[0]
      
    if (!price) {
        toast.error('Price not found')
        return
      }

    await createCheckout({
      amount: price.priceAmount,
        metadata: {
        plan: planName,
        productKey,
        productId: product.id,
        priceId: price.id
      }
    })
  }, [productKey, planName, products, productsLoading, createCheckout])

  return { 
    handleGetStarted, 
    isLoading: productsLoading || checkoutLoading,
    getButtonText
  }
} 