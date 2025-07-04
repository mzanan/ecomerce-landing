"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { PrimaryButton, SecondaryButton } from "@/components/styles/buttons"
import { useCTA } from "./useCTA"
import { COMPANY } from "@/lib/socials"

export const CTA = () => {
  const { fadeInUp } = useCTA()

  return (
    <section className="snap-start h-screen flex items-center ">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center space-y-8 max-w-4xl mx-auto" {...fadeInUp}>
          <h2 className="text-4xl lg:text-6xl font-bold text-black">
            Start strong, sell fast.
          </h2>
          <p className="text-xl text-gray-600">
            Get a modern store with everything set up — just plug in your products and go live.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton
              onClick={() => {
                document.getElementById('pricing')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                })
              }}
            >
              Start Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </PrimaryButton>
            <SecondaryButton
              size="lg"
              onClick={() => window.open(COMPANY.demoUrl, "_blank")}
            >
              View Live Demo
            </SecondaryButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 