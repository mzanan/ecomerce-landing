import { PricingPlan } from "./usePricing.types"
import { useAnimations } from "@/hooks/useAnimations"

export const usePricing = () => {
  const { fadeInUp, fadeInLeft, fadeInRight } = useAnimations()

  const pricingPlans: PricingPlan[] = [
    {
      name: "Launch Ready",
      price: "$1,500",
      tagline: "Launch fast with a ready-to-sell store — everything you need, no code required.",
      features: [
        "Admin dashboard (manage products, orders, customers)",
        "Stripe integration for secure checkout",
        "Responsive design + SEO essentials",
        "Add your logo, colors, fonts",
        "Light customization (up to 5 design changes)",
        "Email support",
        "Unlimited product support",
        "Up to 5 products included",
      ],
    },
    {
      name: "Custom Pro",
      price: "$2,000",
      tagline: "Built-for-you store, uniquely branded and infinitely scalable.",
      highlighted: true,
      features: [
        "Advanced admin dashboard with in-depth analytics",
        "Flexible checkout with any provider",
        "Unlimited products",
        "Fully custom layout & UX",
        "SEO setup + social media integration",
        "Priority support",
        "Brand-focused design (animations, layout, components)",
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