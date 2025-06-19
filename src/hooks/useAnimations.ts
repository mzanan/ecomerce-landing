import { AnimationVariant } from "@/types"

export const useAnimations = () => {
  const fadeInUp: AnimationVariant = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 1.2 },
    viewport: { once: true },
  }

  const fadeInLeft: AnimationVariant = {
    initial: { opacity: 0, x: -60 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 1.2 },
    viewport: { once: true },
  }

  const fadeInRight: AnimationVariant = {
    initial: { opacity: 0, x: 60 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 1.2 },
    viewport: { once: true },
  }

  const floatingAnimation = {
    y: [0, -10, 0],
  }

  const floatingTransition = (duration = 4, delay = 0) => ({
    y: {
      duration,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
    opacity: { duration: 1.2, delay },
  })

  return {
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    floatingAnimation,
    floatingTransition,
  }
} 