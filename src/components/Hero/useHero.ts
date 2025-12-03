import { useAnimations } from "@/hooks/useAnimations"
import { useState } from "react"

export const useHero = () => {
  const { floatingAnimation, floatingTransition } = useAnimations()
  const [isIntroFinished, setIsIntroFinished] = useState(false)

  const handleIntroAnimationComplete = () => setIsIntroFinished(true)

  // "Launch your store today." - word-by-word appearance with delays (no fade/movement)
  const titleWordFadeIn = (wordIndex: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1, delay: wordIndex * 0.30 }
  })

  // "No code, no delays." - word-by-word appearance with delays (no fade/movement)
  const subtitleWordFadeIn = (wordIndex: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: 0.1,
      // Base delay of 1.5s to start after title finishes (~1.2s) + 0.3s buffer
      // wordIndex <= 1: First 2 words have 1.5s base + 0.15s intervals
      // wordIndex > 1: Last 2 words have 1.5s base + 0.5s pause + 0.5s extra delay + 0.15s intervals
      // Result: "No"(1.5s) → "code,"(1.65s) → PAUSE(0.25s) → "no"(2.8s) → "delays."(2.95s)
      delay: 1.5 + (wordIndex <= 1 ? wordIndex * 0.15 : 0.25 + wordIndex * 0.15 + 0.5)
    }
  })

  // "A fully custom e-commerce solution..." - fade in animation for description paragraph
  const descriptionFadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, delay: 3 }
  }

  // "Start Your Store Now" button - fade in animation
  const primaryButtonFadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 4 }
  }

  // "View Live Demo" button - fade in animation
  const secondaryButtonFadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 4.5 }
  }

  // PhoneMockup component - fade in animation
  const phoneMockupFadeIn = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, delay: 5 }
  }


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
    titleWordFadeIn,
    subtitleWordFadeIn,
    descriptionFadeIn,
    primaryButtonFadeIn,
    secondaryButtonFadeIn,
    phoneMockupFadeIn,
    floatingAnimation,
    floatingTransition,
    mockupFloatingCards,
    isIntroFinished,
    handleIntroAnimationComplete,
  }
} 