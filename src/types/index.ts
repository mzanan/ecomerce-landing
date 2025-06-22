export interface AnimationVariant {
  initial: { opacity: number; y?: number; x?: number }
  whileInView: { opacity: number; y?: number; x?: number }
  transition: { duration: number }
  viewport: { once: boolean }
}

export * from './polar' 