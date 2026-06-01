import { useAnimations } from "@/hooks/useAnimations"
import { useEffect, useRef, useState, useMemo } from "react"
import { Feature } from "./useFeatures.types"

export const useFeatures = () => {
  const { fadeInUp, fadeInLeft, fadeInRight } = useAnimations()
  const mediaRefs = useRef<(HTMLElement | null)[]>([])
  const [mediaRatios, setMediaRatios] = useState<Record<number, number>>({})
  const [openedMedia, setOpenedMedia] = useState<{
    index: number
    feature: Feature
    currentTime?: number
  } | null>(null)

  const handleMediaClick = (index: number, feature: Feature) => {
    let currentTime = 0
    if (feature.mediaType === "video") {
      const videoElement = mediaRefs.current[index] as HTMLVideoElement
      if (videoElement) {
        currentTime = videoElement.currentTime
      }
    }
    setOpenedMedia({ index, feature, currentTime })
  }

  const handleCloseModal = () => {
    setOpenedMedia(null)
  }

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && openedMedia) {
        handleCloseModal()
      }
    }

    if (openedMedia) {
      document.addEventListener('keydown', handleEscKey)
      return () => {
        document.removeEventListener('keydown', handleEscKey)
      }
    }
  }, [openedMedia])

  const features = useMemo<Feature[]>(() => [
    {
      id: 0,
      title: "Interactive Landing Experience",
      description:
        "Let users choose their path from the very first second. A sleek diagonal divider reacts to mouse movement, creating an engaging, dynamic first impression. Upon selecting a side (White or Black), the divider rotates smoothly and triggers an automatic scroll to the relevant section, no manual navigation needed.",
      features: [
        "Smooth animations",
        "Mouse-responsive design",
        "Thematic selection with auto-scroll",
      ],
      icon: "🎯",
      media: "/videos/demos/desktop/1.mp4",
      mobileMedia: "/videos/demos/mobile/1.mp4",
      mediaType: "video",
    },
    {
      id: 2,
      title: "Immersive Product View",
      description:
        'Bring collections to life with layered carousels. Each collection features a captivating main carousel, while individual items offer their own sliders with size/quantity selectors and instant add-to-cart functionality. This dual layout enhances storytelling while keeping shopping intuitive and fast.',
      features: [
        "Full-screen set view with carousel",
        "Independent carousels for each item",
        "Seamless add-to-cart interaction",
      ],
      icon: "🛍️",
      media: "/videos/demos/desktop/3.mp4",
      mobileMedia: "/videos/demos/mobile/3.mp4",
      mediaType: "video",
    },
    {
      id: 3,
      title: "Cart and checkout flow",
      description:
        "A smooth, intuitive path from cart to payment, built to convert. Customers review their cart, adjust quantities, and check out in just a few clicks, fast, secure, and friction-free.",
      features: [
        "Clear cart review and editing",
        "Fast, secure checkout",
        "Designed to reduce drop-off",
      ],
      icon: "🛍️",
      media: "/videos/demos/desktop/4.mp4",
      mobileMedia: "/videos/demos/mobile/4.mp4",
      mediaType: "video",
    },
    {
      id: 4,
      title: "Unique Product Layouts",
      description:
        "Showcase your collections with style. A variety of refined, creative layouts highlight product sets like fashion collections, each with a distinct, editorial feel that elevates the shopping experience.",
      features: [
        "Multiple layout variations",
        "Editorial, lookbook-ready presentations",
        "Designed for visual impact",
      ],
      icon: "✨",
      media: "/videos/demos/desktop/2.mp4",
      mobileMedia: "/videos/demos/mobile/2.mp4",
      mediaType: "video",
    },
    {
      id: 5,
      title: "Homepage Banner Editor",
      description:
        "Easily create and update homepage text banners to highlight offers, announcements, or promotions. Rearrange components with simple drag-and-drop, no developer needed.",
      features: [
        "Create and edit text banners",
        "Drag-and-drop layout control",
        "Full flexibility without touching code",
      ],
      icon: "🏷️",
      media: "/videos/demos/desktop/7.mp4",
      mobileMedia: "/videos/demos/mobile/4.mp4",
      mediaType: "video",
    },
    {
      id: 6,
      title: "Set Layout Editor",
      description:
        "From the admin panel, choose and arrange the layout for each product set, no code required. Pick from a range of modern, elegant styles so every collection looks distinct and on-brand.",
      features: [
        "Pick a layout per set from the panel",
        "Modern, elegant style presets",
        "No code required",
      ],
      icon: "🎨",
      media: "/videos/demos/desktop/6.mp4",
      mobileMedia: "/videos/demos/mobile/2.mp4",
      mediaType: "video",
    },
  ], [])

  const mediaVariants = {
    hidden: (isEven: boolean) => ({ opacity: 0, x: isEven ? -100 : 100 }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2 },
    },
  }

  const textVariants = {
    hidden: (isEven: boolean) => ({ opacity: 0, x: isEven ? 100 : -100 }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, delay: 0.3 },
    },
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const newRatios: Record<number, number> = {}
        entries.forEach((entry) => {
          const index = mediaRefs.current.findIndex(
            (ref) => ref === entry.target
          )
          if (index !== -1) {
            newRatios[index] = entry.intersectionRatio
          }
        })
        setMediaRatios((prevRatios) => ({ ...prevRatios, ...newRatios }))
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      }
    )

    const currentMediaRefs = mediaRefs.current
    currentMediaRefs.forEach((media) => {
      if (media) {
        observer.observe(media)
      }
    })

    return () => {
      currentMediaRefs.forEach((media) => {
        if (media) {
          observer.unobserve(media)
        }
      })
    }
  }, [features.length])

  useEffect(() => {
    let mostVisibleIndex = -1
    let maxRatio = 0

    for (const indexStr in mediaRatios) {
      const index = parseInt(indexStr, 10)
      if (mediaRatios[index] > maxRatio) {
        maxRatio = mediaRatios[index]
        mostVisibleIndex = index
      }
    }

    if (maxRatio < 0.5) {
      mediaRefs.current.forEach((media) => {
        if (media instanceof HTMLVideoElement && !media.paused) {
          media.pause()
        }
      })
      return
    }

    const mostVisibleIsVideo =
      features[mostVisibleIndex]?.mediaType === "video"

    mediaRefs.current.forEach((media, index) => {
      if (!(media instanceof HTMLVideoElement)) return

      if (index === mostVisibleIndex && mostVisibleIsVideo) {
        if (media.paused) {
          media.play().catch((error) => console.error("Video play failed:", error))
        }
      } else {
        if (!media.paused) {
          media.pause()
        }
      }
    })
  }, [mediaRatios, features])

  return {
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    features,
    mediaRefs,
    mediaVariants,
    textVariants,
    openedMedia,
    handleMediaClick,
    handleCloseModal,
  }
} 