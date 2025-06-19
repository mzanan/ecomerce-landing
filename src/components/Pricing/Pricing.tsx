"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { usePricing } from "./usePricing"

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
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative ${plan.highlighted ? "md:scale-105" : ""}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: plan.highlighted ? 0.4 : 0.2 }}
              viewport={{ once: true }}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 rounded-full text-sm font-medium z-10">
                  Most Popular
                </div>
              )}
              <Card className="p-8 h-full flex flex-col hover:scale-105 transition-all duration-300 
                      backdrop-blur-sm border border-gray-200/50 bg-white/10 shadow-lg rounded-xl">
                <div className="space-y-6 flex-1 flex flex-col">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-black">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-black">
                        {plan.price}
                      </span>
                    </div>
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
                    <Button 
                      className="w-full font-medium px-6 py-3 rounded-full transition-all duration-300 bg-black text-white hover:bg-black/80 hover:scale-105"
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 