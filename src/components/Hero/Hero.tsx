"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { PrimaryButton, SecondaryButton } from "@/components/styles/buttons"
import { PhoneMockup } from "@/components/PhoneMockup/PhoneMockup"
import { COMPANY } from "@/lib/socials"
import { useHero } from "./useHero"

const ActionButtons = ({ className, sequentialFadeIn }: { 
  className: string, 
  sequentialFadeIn: (delay: number) => {
    initial: { opacity: number; y: number }
    whileInView: { opacity: number; y: number }
    transition: { duration: number; delay: number }
    viewport: { once: boolean; amount: number }
  }
}) => {
  return (
    <motion.div className={`flex flex-col md:flex-row gap-4 items-center justify-center ${className}`} {...sequentialFadeIn(0.9)}>
      <motion.div className="w-full sm:w-auto" {...sequentialFadeIn(0.2)}>
        <PrimaryButton
          fullWidth
          className="sm:w-auto"
          onClick={() => {
            document.getElementById('pricing')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
          }}
        >
          Start Your Store Now
          <ArrowRight className="w-5 h-5 ml-2" />
        </PrimaryButton>
      </motion.div>
      <motion.div className="w-full sm:w-auto" {...sequentialFadeIn(0.5)}>
        <SecondaryButton
          fullWidth
          className="sm:w-auto"
          onClick={() => window.open(COMPANY.demoUrl, "_blank")}
        >
          View Live Demo
        </SecondaryButton>
      </motion.div>
    </motion.div>
  )
}

export const Hero = () => {
  const {
    floatingAnimation,
    mockupFloatingCards,
    isIntroFinished,
    sequentialFadeIn,
    floatingTransition,
    handleIntroAnimationComplete
  } = useHero()

  return (
    <section className="relative snap-start min-h-screen flex md:items-center bg-gradient-to-b from-red-50 to-transparent pt-22 md:pt-4">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col gap-6 md:gap-12 items-center text-center">
          <div>
            <div className="md:space-y-4 max-w-4xl md:pb-6">
              <motion.h1 className="text-3xl lg:text-7xl font-bold text-black" {...sequentialFadeIn(0)}>
                Launch your store today.
              </motion.h1>
              <motion.h1 className="text-3xl lg:text-7xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent" {...sequentialFadeIn(0.3)}>
                No code, no delays.
              </motion.h1>
              <motion.p className="pt-4 md:pt-0 text-md md:text-xl text-gray-600 max-w-3xl mx-auto" {...sequentialFadeIn(0.6)}>
                A fully custom e‑commerce solution with admin dashboard, Stripe integration, mobile‑ready design, and branding — ready to sell from day one.
              </motion.p>
            </div>

            <ActionButtons className="hidden md:flex" sequentialFadeIn={sequentialFadeIn} />
          </div>

          <motion.div className="relative flex justify-center" {...sequentialFadeIn(1.8)}>
            <motion.div
              className="relative flex justify-center items-center h-full overflow-visible"
              onAnimationComplete={handleIntroAnimationComplete}
            >
              <PhoneMockup
                animate={true}
                floatingAnimation={floatingAnimation}
                floatingTransition={floatingTransition}
                isIntroFinished={isIntroFinished}
              />

              {mockupFloatingCards.map((card, index) => (
                <motion.div
                  key={index}
                  className={card.className}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  animate={isIntroFinished ? card.animationType : {}}
                  transition={floatingTransition(
                    card.animationDuration,
                    card.animationDelay
                  )}
                >
                  <span className="text-sm font-medium text-gray-800">
                    {card.content}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <ActionButtons className="flex md:hidden pt-10" sequentialFadeIn={sequentialFadeIn} />
        </div>
      </div>
    </section>
  )
} 