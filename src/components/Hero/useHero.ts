import { useAnimations } from "@/hooks/useAnimations"
import { useState } from "react"

export const useHero = () => {
  const { fadeInUp, floatingAnimation, floatingTransition } = useAnimations()
  const [isIntroFinished, setIsIntroFinished] = useState(false)

  const handleIntroAnimationComplete = () => {
    setIsIntroFinished(true)
  }

  const mockupFloatingCards = [
    {
      className: "absolute top-10 -left-16 bg-white backdrop-blur-sm rounded-full px-3 py-1 shadow-lg",
      content: "🌐 E-commerce Store",
      animationDelay: 0.2,
      animationDuration: 3.5,
      animationType: { y: [0, 8, 0] },
    },
    {
      className: "absolute top-2 -right-12 bg-white backdrop-blur-sm rounded-full px-3 py-1 shadow-lg",
      content: "💳 Secure Payments",
      animationDelay: 0.3,
      animationDuration: 3,
      animationType: { y: [0, -6, 0] },
    },
    {
      className: "absolute top-1/2 -right-16 bg-white backdrop-blur-sm rounded-full px-3 py-1 shadow-lg",
      content: "📱 Mobile Optimized",
      animationDelay: 0.4,
      animationDuration: 3.5,
      animationType: { y: [0, 10, 0] },
    },
    {
      className: "absolute bottom-4 -left-20 bg-white backdrop-blur-sm rounded-full px-3 py-1 shadow-lg",
      content: "📊 Analytics Dashboard",
      animationDelay: 0.5,
      animationDuration: 4,
      animationType: { y: [0, -8, 0] },
    },
    {
      className: "absolute bottom-2 -right-16 bg-white backdrop-blur-sm rounded-full px-3 py-1 shadow-lg",
      content: "🔒 SSL Secured",
      animationDelay: 0.6,
      animationDuration: 3.2,
      animationType: { y: [0, 6, 0] },
    },
  ]

  return {
    fadeInUp,
    floatingAnimation,
    floatingTransition,
    mockupFloatingCards,
    isIntroFinished,
    handleIntroAnimationComplete,
  }
} 