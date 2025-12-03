export interface Feature {
  id: number
  title: string
  description: string
  features: string[]
  icon: string
  media: string
  mobileMedia: string
  mediaType: "video" | "image"
} 