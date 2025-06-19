"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCTA } from "./useCTA"

export const CTA = () => {
  const { fadeInUp } = useCTA()

  return (
    <section className="relative snap-start py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center space-y-8 max-w-4xl mx-auto" {...fadeInUp}>
          <h2 className="text-4xl lg:text-6xl font-bold text-black">
            Start strong, sell fast.
          </h2>
          <p className="text-xl text-gray-600">
            Get a modern store with everything set up — just plug in your products and go live.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-full transition-all duration-300 bg-black text-white hover:bg-black/80 hover:scale-105"
            >
              Start Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 rounded-full transition-all duration-300 border-black text-black bg-transparent hover:bg-black hover:text-white hover:scale-105"
            >
              View Live Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 