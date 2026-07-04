"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { useViewportVideoPlayback } from "@/hooks/useViewportVideoPlayback"
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
  loop = true,
  onEnded
}: PhoneMockupProps) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const isInView = useInView(rootRef, { margin: "25% 0px" })
  const {
    order,
    buttonOrder,
    elementColors,
    flashingElements,
    spring,
  } = usePhoneMockup(!videoSrc && isInView)
  useViewportVideoPlayback(videoRef, Boolean(videoSrc) && autoPlay)
  return (
    <motion.div
      ref={rootRef}
      className={`relative bg-gray-900 rounded-[40px] border-[8px] border-gray-700 overflow-hidden h-full aspect-[9/16] ${className} ${width} ${height}`}
      initial={animate ? { opacity: 0, y: 60 } : undefined}
      animate={animate ? (isIntroFinished && floatingAnimation ? floatingAnimation : { opacity: 1, y: 0 }) : undefined}
      viewport={{ once: true }}
      transition={floatingTransition ? floatingTransition(4) : { duration: 0.6 }}
    >
      {videoSrc ? (
        <video
          ref={(el) => {
            videoRef.current = el
            setVideoRef?.(el)
          }}
          src={videoSrc}
          poster={videoSrc.replace(/\.mp4$/, ".webp")}
          preload="none"
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          autoPlay={autoPlay}
          onEnded={onEnded}
          className="absolute inset-0 video-compensate-rounded"
        />
      ) : (
        children || (
          <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#1E1E2F] to-[#2B2D42]">
            <div className="absolute inset-0 opacity-20 bg-grid-pattern-small"></div>

            <AnimatedElement
              className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-4"
              elementColor={elementColors[0]}
              isFlashing={flashingElements.has(0)}
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

const AnimatedElement = ({ className, elementColor, isFlashing, children }: AnimatedElementProps) => (
  <motion.div
    className={`${className} ${elementColor} transition-colors duration-[1500ms] ease-in-out`}
    animate={{ scale: isFlashing ? [1, 1.08, 1] : 1 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    <motion.span
      className="absolute inset-0 rounded-[inherit] bg-white pointer-events-none"
      animate={{ opacity: isFlashing ? [0, 0.3, 0] : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    />
    {children}
  </motion.div>
)

const renderReorderableElement = (index: number, buttonOrder: number[], elementColors: string[], flashingElements: Set<number>) => {
  const isFlashing = flashingElements.has(index === 0 ? 1 : index === 4 ? 6 : index)

  switch (index) {
    case 0:
      return (
        <AnimatedElement
          className="relative w-full h-40 rounded-xl opacity-30"
          elementColor={elementColors[1]}
          isFlashing={isFlashing}
        />
      )
    case 1:
      return (
        <AnimatedElement
          className="relative w-full h-20 rounded-xl opacity-10"
          elementColor={elementColors[2]}
          isFlashing={isFlashing}
        />
      )
    case 2:
      return (
        <AnimatedElement
          className="relative w-full h-20 rounded-xl opacity-20"
          elementColor={elementColors[3]}
          isFlashing={isFlashing}
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
          className="relative w-full h-12 rounded-full mt-auto opacity-80"
          elementColor={elementColors[6]}
          isFlashing={isFlashing}
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
      className={`relative w-full h-16 rounded-xl ${index === 0 ? 'opacity-20' : 'opacity-30'}`}
      elementColor={elementColors[colorIndex]}
      isFlashing={isFlashing}
    />
  )
}
