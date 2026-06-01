export interface Feature {
  id: number
  title: string
  description: string
  features: string[]
  icon: string
  media: string | string[]
  mobileMedia: string | string[]
  mediaType: "video" | "image"
} 