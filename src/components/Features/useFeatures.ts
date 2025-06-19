import {
  CreditCard,
  Smartphone,
  BarChart3,
  Globe,
  Palette,
  Lock
} from "lucide-react"
import { Feature } from "@/types"
import { useAnimations } from "@/hooks/useAnimations"

export const useFeatures = () => {
  const { fadeInUp, fadeInLeft, fadeInRight } = useAnimations()

  const features: Feature[] = [
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Stripe by default, but flexible to your payment method.",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Responsive design that converts on all devices",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track sales, customers, and inventory in real-time",
    },
    {
      icon: Palette,
      title: "Customizable Design",
      description: "Easy-to-modify templates and color schemes",
    },
    {
      icon: Lock,
      title: "SSL Security",
      description: "Bank-level security for customer data protection",
    },
    {
      icon: Globe,
      title: "SEO Optimized",
      description: "Built-in SEO features to rank higher on Google",
    },
  ]

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.6,
        delay: i * 0.3,
      },
    }),
  }

  return {
    features,
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    cardVariants,
  }
} 