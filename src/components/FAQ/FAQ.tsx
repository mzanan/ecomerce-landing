"use client"

import { motion } from "motion/react"
import { Card } from "@/components/ui/card"
import { useFAQ } from "./useFAQ"

export const FAQ = () => {
  const { faqs, fadeInUp, cardVariants } = useFAQ()

  return (
    <section id="faq" className="section-layout h-dvh">
      <div className="section-container">
        <motion.div className="section-header" {...fadeInUp}>
          <h2 className="main-heading">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-3 md:space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="p-4 md:p-6 card-glass">
                <div className="space-y-1 md:space-y-3">
                  <h3 className="md:text-lg font-bold text-black">
                    {faq.question}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 md:leading-relaxed">
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