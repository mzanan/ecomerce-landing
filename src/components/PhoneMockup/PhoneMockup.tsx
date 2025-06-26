"use client"

import { motion, type TargetAndTransition, type Transition } from "framer-motion"
import { ReactNode } from "react"

interface PhoneMockupProps {
  videoSrc?: string
  children?: ReactNode
  className?: string
  animate?: boolean
  floatingAnimation?: TargetAndTransition
  floatingTransition?: (duration: number) => Transition
  isIntroFinished?: boolean
  width?: string
  height?: string
  setVideoRef?: (element: HTMLVideoElement | null) => void
}

export const PhoneMockup = ({ 
  videoSrc, 
  children, 
  className = "", 
  animate = true,
  floatingAnimation,
  isIntroFinished = false,
  width = "w-[280px]",
  height = "h-[580px]",
  floatingTransition,
  setVideoRef
}: PhoneMockupProps) => {
  return (
    <motion.div
      className={`relative bg-gray-900 rounded-[40px] border-[8px] border-gray-700 overflow-hidden ${className} ${width} ${height}`}
      initial={animate ? { opacity: 0, y: 60 } : undefined}
      animate={animate ? (isIntroFinished && floatingAnimation ? floatingAnimation : { opacity: 1, y: 0 }) : undefined}
      viewport={{ once: true }}
      transition={floatingTransition ? floatingTransition(4) : { duration: 0.6 }}
    >
      {videoSrc ? (
        <video
          ref={setVideoRef}
          src={videoSrc}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          autoPlay
        />
      ) : (
        children || (
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
        )
      )}

      <div className="absolute top-[120px] -right-[8px] w-[8px] h-16 bg-gray-700 rounded-r-lg"></div>
      <div className="absolute top-[200px] -left-[8px] w-[8px] h-10 bg-gray-700 rounded-l-lg"></div>
      <div className="absolute top-[220px] -left-[8px] w-[8px] h-10 bg-gray-700 rounded-l-lg"></div>

      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
    </motion.div>
  )
} 