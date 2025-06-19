"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { useFeatures } from "./useFeatures"

export const Features = () => {
  const { features, fadeInUp, cardVariants } = useFeatures()

  return (
    <section id="features" className="relative snap-start py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center space-y-6 mb-16" {...fadeInUp}>
          <h2 className="text-4xl lg:text-6xl font-bold text-black">
            Everything you need
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;ve built all the features you need to launch and scale your online store successfully.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="py-10 backdrop-blur-sm border border-gray-200/50 bg-white/10 transition-all duration-300 shadow-lg rounded-xl flex items-center justify-center h-full">
                <div className="space-y-4 h-full flex flex-col justify-center items-center">
                  <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-3 flex-1 text-center">
                    <h3 className="text-xl font-bold text-black leading-tight">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
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