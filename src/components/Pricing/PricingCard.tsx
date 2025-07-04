"use client"

import { motion } from "framer-motion"
import { Check, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { PrimaryButton } from "@/components/styles/buttons"
import { usePricingCard } from "./usePricingCard"

interface PricingCardProps {
  plan: {
    name: string
    price: string
    tagline: string
    features: string[]
    highlighted?: boolean
  }
  productKey: 'launch-ready' | 'custom-pro'
}

export const PricingCard = ({ plan, productKey }: PricingCardProps) => {
  const { isLoading, handleGetStarted, getButtonText } = usePricingCard({
    productKey,
    planName: plan.name
  })

  return (
    <motion.div
      className={`relative ${plan.highlighted ? "md:scale-105" : ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: plan.highlighted ? 0.4 : 0.2 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      {plan.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 rounded-full text-sm font-medium z-10">
          Most Popular
        </div>
      )}
      <Card className="p-8 h-full flex flex-col hover:scale-105 transition-all duration-300 
              backdrop-blur-sm border border-gray-200/50 bg-white/50 shadow-lg rounded-xl">
        <div className="space-y-6 flex-1 flex flex-col">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-black text-center">
              {plan.name}
            </h3>
            <div className="flex items-baseline w-full">
              <span className="text-4xl font-bold text-black w-full text-center">
                {plan.price}
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxe text-center">
              {plan.tagline}
            </p>
          </div>

          <ul className="space-y-3 flex-1">
            {plan.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-black" />
                <span className="text-gray-700">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-4">
            <PrimaryButton 
              onClick={handleGetStarted}
              isLoading={isLoading}
              loadingText={<Loader2 className="h-4 w-4 animate-spin" />}
              fullWidth={true}
            >
              {getButtonText()}
            </PrimaryButton>
          </div>
        </div>
      </Card>
    </motion.div>
  )
} 