"use client"

import { motion } from "framer-motion"
import { usePricing } from "./usePricing"
import { PricingCard } from "./PricingCard"

export const Pricing = () => {
  const { pricingPlans } = usePricing()

  return (
    <section id="pricing" className="section-layout">
      <div className="section-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="main-heading">
            Choose your plan
          </h2>
          <p className="sub-heading">
            Different plans for different needs.
          </p>
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 max-w-2xl mx-auto mt-6">
            <p className="text-yellow-800 text-sm font-medium text-center">
              Payments are in demo mode using Stripe, so no real charges will be made.
            </p>
            <p className="text-yellow-800 text-sm font-medium text-center">
              Use card number <span className="font-bold">4242 4242 4242 4242</span> with any CVC and a valid expiration date.
            </p>
          </div>
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