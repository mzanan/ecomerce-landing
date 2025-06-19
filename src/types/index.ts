export interface NavigationItem {
  href: string
  label: string
}

export interface Feature {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

export interface DemoFeature {
  title: string
  description: string
  features: string[]
  icon: string
  media: string
  mediaType: "video" | "image"
}

export interface PricingPlan {
  name: string
  price: string
  features: string[]
  highlighted?: boolean
}

export interface AnimationVariant {
  initial: { opacity: number; y?: number; x?: number }
  whileInView: { opacity: number; y?: number; x?: number }
  transition: { duration: number }
  viewport: { once: boolean }
} 