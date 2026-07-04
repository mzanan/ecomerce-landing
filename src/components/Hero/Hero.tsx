"use client"

import { motion } from "motion/react"
import { ActionButtons } from "@/components/styles/buttons"
import { PhoneMockup } from "@/components/PhoneMockup/PhoneMockup"
import { useHero } from "./useHero"

export const Hero = () => {
  const {
    floatingAnimation,
    mockupFloatingCards,
    isIntroFinished,
    descriptionFadeIn,
    primaryButtonFadeIn,
    secondaryButtonFadeIn,
    phoneMockupFadeIn,
    titleWordFadeIn,
    subtitleWordFadeIn,
    floatingTransition,
    handleIntroAnimationComplete
  } = useHero()

  return (
    <section className="section-layout section-container h-dvh">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 sm:justify-center items-center h-full">
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="text-center">
            <motion.h1 className="xs:text-xl xm:text-2xl lg:text-7xl font-bold text-black">
              {"Launch your store today.".split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-2"
                  {...titleWordFadeIn(index)}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p className="xs:text-2xl xm:text-3xl lg:text-7xl font-bold bg-gradient-text">
              {"No code, no delays.".split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-2"
                  {...subtitleWordFadeIn(index)}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </div>

          <motion.p
            className="hidden md:block text-md md:text-xl text-gray-600 text-center max-w-3xl"
            {...descriptionFadeIn}
          >
            A fully custom e‑commerce solution with admin dashboard, Stripe integration, mobile‑ready design, and branding. Ready to sell from day one.
          </motion.p>

          <ActionButtons
            primaryButtonAnimation={primaryButtonFadeIn}
            secondaryButtonAnimation={secondaryButtonFadeIn}
            className="text-sm sm:text-base"
          />
        </div>

        <motion.div {...phoneMockupFadeIn} className="max-h-[500px] md:max-h-[500px] h-full">
          <motion.div
            className="relative h-full"
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
      </div>
    </section >
  )
} 