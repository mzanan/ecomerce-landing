"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { PhoneMockup } from "@/components/PhoneMockup/PhoneMockup"
import { useHero } from "./useHero"

export const HeroMockup = () => {
  const mockupRef = useRef<HTMLDivElement>(null)
  const mockupInView = useInView(mockupRef, { margin: "25% 0px" })
  const {
    floatingAnimation,
    mockupFloatingCards,
    isIntroFinished,
    phoneMockupFadeIn,
    floatingTransition,
    handleIntroAnimationComplete
  } = useHero()

  return (
    <motion.div ref={mockupRef} {...phoneMockupFadeIn} className="max-h-[500px] md:max-h-[500px] h-full">
      <motion.div
        className="relative h-full"
        onAnimationComplete={handleIntroAnimationComplete}
      >
        <PhoneMockup
          animate={true}
          floatingAnimation={floatingAnimation}
          floatingTransition={floatingTransition}
          isIntroFinished={isIntroFinished && mockupInView}
        />

        {mockupFloatingCards.map((card, index) => (
          <motion.div
            key={index}
            className={card.className}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={isIntroFinished && mockupInView ? card.animationType : {}}
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
  )
}
