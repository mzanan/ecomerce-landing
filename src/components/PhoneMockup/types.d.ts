import { ReactNode } from "react"
import { TargetAndTransition, Transition } from "framer-motion"

export interface PhoneMockupProps {
  videoSrc?: string
  children?: ReactNode
  className?: string
  animate?: boolean
  floatingAnimation?: TargetAndTransition
  isIntroFinished?: boolean
  width?: string
  height?: string
  floatingTransition?: (duration: number) => Transition
  setVideoRef?: (element: HTMLVideoElement | null) => void
  autoPlay?: boolean
  playsInline?: boolean
  muted?: boolean
  onEnded?: () => void
}

export interface AnimatedElementProps {
  className: string
  elementColor: string
  isFlashing: boolean
  glowColor: string
  brightness: number
  children?: ReactNode
}
