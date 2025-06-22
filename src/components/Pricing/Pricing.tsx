"use client"

import { motion } from "framer-motion"
import { usePricing } from "./usePricing"
import { PricingCard } from "./PricingCard"

export const Pricing = () => {
  const { pricingPlans } = usePricing()

  return (
    <section id="pricing" className="relative snap-start py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center space-y-6 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-black">
            Choose your plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Different plans for different needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {pricingPlans.map((plan, index) => {
            const productKey = plan.name === "Launch Ready" ? "launch-ready" : "custom-pro"
            return (
              <PricingCard 
                key={index}
                plan={plan}
                productKey={productKey}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
} 