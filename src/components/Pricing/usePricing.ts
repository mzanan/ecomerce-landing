import { PricingPlan } from "./usePricing.types"
import { useAnimations } from "@/hooks/useAnimations"

export const usePricing = () => {
  const { fadeInUp, fadeInLeft, fadeInRight } = useAnimations()

  const pricingPlans: PricingPlan[] = [
    {
      name: "Launch Ready",
      price: "$1500",
      features: [
        "Basic Analytics Dashboard",
        "Secure Checkout with Stripe",
        "Built-in Admin Panel",
        "SEO Optimization",
        "Email Support",
        "Up to 5 Products",
        "Branded with Your Name & Logo",
        "5 Visual Tweaks Included (colors, fonts, layout)",
      ],
    },
    {
      name: "Custom Pro",
      price: "$2000",
      highlighted: true,
      features: [
        "Advanced Analytics & Reports",
        "Secure Checkout (Stripe or custom provider)",
        "Built-in Admin Panel",
        "SEO Tools & Social Media Integration",
        "Unlimited Products",
        "Priority Support",
        "Custom Homepage Layout & Components",
        "Fully Custom Design (look & feel, branding, structure)",
      ],
    },
  ]

  return {
    pricingPlans,
    fadeInUp,
    fadeInLeft,
    fadeInRight,
  }
} 