"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { useFAQ } from "./useFAQ"

export const FAQ = () => {
  const { faqs, fadeInUp, cardVariants } = useFAQ()

  return (
    <section id="faq" className="section-layout">
      <div className="section-container">
        <motion.div className="section-header" {...fadeInUp}>
          <h2 className="main-heading">
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
              <Card className="p-6 card-glass">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-heading">
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