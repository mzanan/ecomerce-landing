import { useAnimations } from "@/hooks/useAnimations"
import { useState } from "react"

export const useHero = () => {
  const { floatingAnimation, floatingTransition } = useAnimations()
  const [isIntroFinished, setIsIntroFinished] = useState(false)

  const handleIntroAnimationComplete = () => {
    setIsIntroFinished(true)
  }

  const sequentialFadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 1.2, delay },
    viewport: { once: true, amount: 0.5 }
  })

  const mockupFloatingCards = [
    {
      className: "absolute top-10 -left-10 md:-left-16 bg-white backdrop-blur-sm rounded-full px-3 py-1 shadow-lg",
      content: "🌐 E-commerce Store",
      animationDelay: 0.2,
      animationDuration: 3.5,
      animationType: { y: [0, 8, 0] },
    },
    {
      className: "absolute top-24 -right-6 md:-right-12 bg-white backdrop-blur-sm rounded-full px-3 py-1 shadow-lg",
      content: "💳 Secure Payments",
      animationDelay: 0.3,
      animationDuration: 3,
      animationType: { y: [0, -6, 0] },
    },
    {
      className: "absolute bottom-16 -left-10 md:-left-20 bg-white backdrop-blur-sm rounded-full px-3 py-1 shadow-lg",
      content: "📱 Mobile Optimized",
      animationDelay: 0.4,
      animationDuration: 3.5,
      animationType: { y: [0, 10, 0] },
    },
    {
      className: "absolute bottom-2 -right-10 md:-right-16 bg-white backdrop-blur-sm rounded-full px-3 py-1 shadow-lg",
      content: "📊 Analytics Dashboard",
      animationDelay: 0.5,
      animationDuration: 4,
      animationType: { y: [0, -8, 0] },
    }
  ]

  return {
    sequentialFadeIn,
    floatingAnimation,
    floatingTransition,
    mockupFloatingCards,
    isIntroFinished,
    handleIntroAnimationComplete,
  }
} 