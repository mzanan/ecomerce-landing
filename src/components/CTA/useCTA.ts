import { useAnimations } from "@/hooks/useAnimations"

export const useCTA = () => {
  const { fadeInUp } = useAnimations()

  return {
    fadeInUp,
  }
} 