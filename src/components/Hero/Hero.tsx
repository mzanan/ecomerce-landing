"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { PrimaryButton, SecondaryButton } from "@/components/styles/buttons"

import { useHero } from "./useHero"

export const Hero = () => {
  const {
    fadeInUp,
    floatingAnimation,
    floatingTransition,
    mockupFloatingCards,
    isIntroFinished,
    handleIntroAnimationComplete,
  } = useHero()

  return (
    <section className="relative snap-start min-h-[calc(100vh-6rem)] flex items-center overflow-hidden pt-24 pb-20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col gap-12 items-center text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.h1 className="text-5xl lg:text-7xl font-bold leading-tight text-black" {...fadeInUp}>
                Start selling your vision
              </motion.h1>
              <motion.p className="text-xl text-gray-600" {...fadeInUp}>
                Bring your brand to life with a store that’s fast, flexible, and ready from day one.
              </motion.p>
            </div>

            <motion.div className="flex flex-col sm:flex-row gap-4 items-center justify-center" {...fadeInUp}>
              <motion.div className="w-full sm:w-auto" {...fadeInUp}>
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
              <motion.div className="w-full sm:w-auto" {...fadeInUp}>
                <SecondaryButton
                  fullWidth
                  size="lg"
                  className="sm:w-auto"
                  onClick={() => window.open("https://infideli.vercel.app/", "_blank")}
                >
                  View Live Demo
                </SecondaryButton>
              </motion.div>
            </motion.div>
          </div>

          <motion.div className="relative flex justify-center" {...fadeInUp}>
            <motion.div
              className="relative flex justify-center items-center h-full overflow-visible"
              onAnimationComplete={handleIntroAnimationComplete}
            >
              <motion.div
                className="relative w-[280px] h-[580px] bg-gray-900 rounded-[40px] border-[8px] border-gray-700 overflow-hidden"
                style={{
                  transform:
                    "perspective(1000px) rotateY(-15deg) rotateX(5deg) rotateZ(-25deg)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 25px 100px -12px rgba(0, 0, 0, 0.15)",
                }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={isIntroFinished ? floatingAnimation : {}}
                transition={floatingTransition(4)}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-gray-900 rounded-b-xl z-10"></div>

                <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#1E1E2F] to-[#2B2D42]">
                  <div className="absolute inset-0 opacity-20 bg-grid-pattern-small"></div>

                  <div className="absolute top-0 left-0 right-0 h-12 backdrop-blur-sm flex items-center justify-between px-4 bg-purple-600">
                    <div className="w-8 h-3 rounded-full bg-white"></div>
                    <div className="w-20 h-3 rounded-full bg-white"></div>
                  </div>

                  <div className="absolute top-16 left-4 right-4 bottom-4 flex flex-col gap-4">
                    <div className="w-full h-40 rounded-xl bg-purple-600 opacity-30"></div>
                    <div className="w-full h-20 rounded-xl bg-white opacity-10"></div>
                    <div className="w-full h-20 rounded-xl bg-gray-400 opacity-20"></div>
                    <div className="flex gap-2">
                      <div className="w-1/2 h-16 rounded-xl bg-purple-600 opacity-20"></div>
                      <div className="w-1/2 h-16 rounded-xl bg-teal-400 opacity-30"></div>
                    </div>
                    <div className="w-full h-12 rounded-full mt-auto bg-teal-400 opacity-80"></div>
                  </div>
                </div>

                <div className="absolute top-[120px] -right-[8px] w-[8px] h-16 bg-gray-700 rounded-r-lg"></div>
                <div className="absolute top-[200px] -left-[8px] w-[8px] h-10 bg-gray-700 rounded-l-lg"></div>
                <div className="absolute top-[220px] -left-[8px] w-[8px] h-10 bg-gray-700 rounded-l-lg"></div>

                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
              </motion.div>

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
        </div>
      </div>
    </section>
  )
} 