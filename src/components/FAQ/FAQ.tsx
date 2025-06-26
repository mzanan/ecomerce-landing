"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { useFAQ } from "./useFAQ"

export const FAQ = () => {
  const { faqs, fadeInUp, cardVariants } = useFAQ()

  return (
    <section id="faq" className="relative snap-start py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center space-y-6 mb-16" {...fadeInUp}>
          <h2 className="text-4xl lg:text-6xl font-bold text-black">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="p-6 backdrop-blur-sm border border-gray-200/50 bg-white/10 shadow-lg rounded-xl">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-black">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 