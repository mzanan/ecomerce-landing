"use client"

import { motion } from "framer-motion"
import { usePhoneMockup } from "./usePhoneMockup"
import type { PhoneMockupProps, AnimatedElementProps } from "./types"

export const PhoneMockup = ({
  videoSrc,
  children,
  className,
  animate = true,
  floatingAnimation,
  isIntroFinished = false,
  width = "w-auto",
  height = "min-h-[392px] max-h-[500px]",
  floatingTransition,
  setVideoRef,
  autoPlay = true,
  playsInline = true,
  muted = true,
  onEnded
}: PhoneMockupProps) => {
  const {
    order,
    buttonOrder,
    elementColors,
    flashingElements,
    spring,
  } = usePhoneMockup()
  return (
    <motion.div
      className={`relative bg-gray-900 rounded-[40px] border-[8px] border-gray-700 overflow-hidden h-full aspect-[9/16] ${className} ${width} ${height}`}
      initial={animate ? { opacity: 0, y: 60 } : undefined}
      animate={animate ? (isIntroFinished && floatingAnimation ? floatingAnimation : { opacity: 1, y: 0 }) : undefined}
      viewport={{ once: true }}
      transition={floatingTransition ? floatingTransition(4) : { duration: 0.6 }}
    >
      {videoSrc ? (
        <video
          ref={setVideoRef}
          src={videoSrc}
          loop
          muted={muted}
          playsInline={playsInline}
          autoPlay={autoPlay}
          onEnded={onEnded}
        />
      ) : (
        children || (
          <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#1E1E2F] to-[#2B2D42]">
            <div className="absolute inset-0 opacity-20 bg-grid-pattern-small"></div>

            <AnimatedElement
              className="absolute top-0 left-0 right-0 h-12 backdrop-blur-sm flex items-center justify-between px-4"
              elementColor={elementColors[0]}
              isFlashing={flashingElements.has(0)}
              glowColor="rgba(147, 51, 234, 0.5)"
              brightness={1.1}
            >
              <div className="w-8 h-3 rounded-full bg-white"></div>
              <div className="w-20 h-3 rounded-full bg-white"></div>
            </AnimatedElement>

            <div className="absolute top-16 left-4 right-4 bottom-4 flex flex-col gap-4">
              {order.map((index) => (
                <motion.div
                  key={index}
                  layout
                  transition={spring}
                  className="w-full"
                >
                  {renderReorderableElement(index, buttonOrder, elementColors, flashingElements)}
                </motion.div>
              ))}
            </div>
          </div>
        )
      )}

      <div className="absolute top-[120px] -right-[8px] w-[8px] h-16 bg-gray-700 rounded-r-lg"></div>
      <div className="absolute top-[200px] -left-[8px] w-[8px] h-10 bg-gray-700 rounded-l-lg"></div>
      <div className="absolute top-[220px] -left-[8px] w-[8px] h-10 bg-gray-700 rounded-l-lg"></div>

      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
    </motion.div>
  )
}

const AnimatedElement = ({ className, elementColor, isFlashing, glowColor, brightness, children }: AnimatedElementProps) => (
  <motion.div
    className={`${className} ${elementColor}`}
    animate={{
      backgroundColor: elementColor,
      scale: isFlashing ? [1, 1.1, 1] : 1,
      boxShadow: isFlashing ? [
        `0 0 0 0 ${glowColor}`,
        `0 0 20px 5px ${glowColor}`,
        `0 0 0 0 ${glowColor}`
      ] : "0 0 0 0 rgba(0,0,0,0)",
      filter: isFlashing ? `brightness(${brightness})` : "brightness(1)"
    }}
    transition={{
      backgroundColor: { duration: 1.5, ease: "easeInOut" },
      scale: { duration: 0.4, ease: "easeInOut" },
      boxShadow: { duration: 0.4, ease: "easeInOut" },
      filter: { duration: 0.4, ease: "easeInOut" }
    }}
  >
    {children}
  </motion.div>
)

const renderReorderableElement = (index: number, buttonOrder: number[], elementColors: string[], flashingElements: Set<number>) => {
  const isFlashing = flashingElements.has(index === 0 ? 1 : index === 4 ? 6 : index)

  switch (index) {
    case 0:
      return (
        <AnimatedElement
          className="w-full h-40 rounded-xl opacity-30"
          elementColor={elementColors[1]}
          isFlashing={isFlashing}
          glowColor="rgba(147, 51, 234, 0.6)"
          brightness={1.2}
        />
      )
    case 1:
      return (
        <AnimatedElement
          className="w-full h-20 rounded-xl opacity-10"
          elementColor={elementColors[2]}
          isFlashing={isFlashing}
          glowColor="rgba(255, 255, 255, 0.4)"
          brightness={1.3}
        />
      )
    case 2:
      return (
        <AnimatedElement
          className="w-full h-20 rounded-xl opacity-20"
          elementColor={elementColors[3]}
          isFlashing={isFlashing}
          glowColor="rgba(156, 163, 175, 0.5)"
          brightness={1.2}
        />
      )
    case 3:
      return (
        <div className="flex gap-2">
          {buttonOrder.map((buttonIndex) => (
            <motion.div
              key={buttonIndex}
              layout
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 400,
              }}
              className="w-1/2"
            >
              {renderButtonElement(buttonIndex, elementColors, flashingElements)}
            </motion.div>
          ))}
        </div>
      )
    case 4:
      return (
        <AnimatedElement
          className="w-full h-12 rounded-full mt-auto opacity-80"
          elementColor={elementColors[6]}
          isFlashing={isFlashing}
          glowColor="rgba(20, 184, 166, 0.7)"
          brightness={1.2}
        />
      )
    default:
      return null
  }
}

const renderButtonElement = (index: number, elementColors: string[], flashingElements: Set<number>) => {
  const colorIndex = index === 0 ? 4 : 5 // 4 for purple, 5 for teal
  const isFlashing = flashingElements.has(colorIndex)

  return (
    <AnimatedElement
      className={`w-full h-16 rounded-xl opacity-${index === 0 ? '20' : '30'}`}
      elementColor={elementColors[colorIndex]}
      isFlashing={isFlashing}
      glowColor={`rgba(${index === 0 ? '147, 51, 234' : '20, 184, 166'}, 0.6)`}
      brightness={1.3}
    />
  )
}
