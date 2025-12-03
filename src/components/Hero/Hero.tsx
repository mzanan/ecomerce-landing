"use client"

import { motion } from "framer-motion"
import { ActionButtons } from "@/components/styles/buttons"
import { PhoneMockup } from "@/components/PhoneMockup/PhoneMockup"
import { useHero } from "./useHero"

export const Hero = () => {
  const {
    floatingAnimation,
    mockupFloatingCards,
    isIntroFinished,
    titleWordFadeIn,
    subtitleWordFadeIn,
    descriptionFadeIn,
    primaryButtonFadeIn,
    secondaryButtonFadeIn,
    phoneMockupFadeIn,
    floatingTransition,
    handleIntroAnimationComplete
  } = useHero()

  return (
    <section className="section-layout section-container">
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        <div className="flex flex-col gap-8 justify-center items-center">
          <div className="text-center">
            <motion.h1 className="text-3xl lg:text-7xl font-bold text-black">
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
            <motion.h1 className="text-3xl lg:text-7xl font-bold bg-gradient-text">
              {"No code, no delays.".split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-2"
                  {...subtitleWordFadeIn(index)}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          <motion.p
            className="text-md md:text-xl text-gray-600 text-center max-w-3xl"
            {...descriptionFadeIn}
          >
            A fully custom e‑commerce solution with admin dashboard, Stripe integration, mobile‑ready design, and branding. Ready to sell from day one.
          </motion.p>

          <ActionButtons
            primaryButtonAnimation={primaryButtonFadeIn}
            secondaryButtonAnimation={secondaryButtonFadeIn}
          />
        </div>

        <motion.div {...phoneMockupFadeIn}>
          <motion.div
            className="relative flex"
            onAnimationComplete={handleIntroAnimationComplete}
          >
            <PhoneMockup
              animate={true}
              floatingAnimation={floatingAnimation}
              floatingTransition={floatingTransition}
              isIntroFinished={isIntroFinished}
              width="w-auto"
              height="h-[650px] aspect-[9/16]"
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
    </section>
  )
} 