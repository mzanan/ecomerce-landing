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
      id: 1,
      title: "Unique Product Layouts",
      description:
        "Showcase your collections with style. This e-commerce template features a variety of refined and creative layouts designed to highlight product sets like fashion collections. Each layout offers a distinct, editorial feel, blending elegance and originality to elevate the shopping experience.",
      features: [
        "Designed for visual impact",
        "Multiple layout variations",
        "Perfect for lookbooks and curated drops",
      ],
      icon: "✨",
      media: "/videos/demos/desktop/2.mp4",
      mobileMedia: "/videos/demos/mobile/2.mp4",
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
        'The cart and checkout flow is designed to be smooth and intuitive. Users can add items to the cart, view the cart, and checkout with ease. The checkout flow is designed to be smooth and intuitive. Users can add items to the cart, view the cart, and checkout with ease.',
      features: [
        "Smooth and intuitive cart and checkout flow",
        "Easy to use and navigate",
        "Fast and secure checkout",
      ],
      icon: "🛍️",
      media: "/videos/demos/desktop/4.mp4",
      mobileMedia: "/videos/demos/mobile/4.mp4",
      mediaType: "video",
    },
    {
      id: 4,
      title: "Powerful Admin Dashboard",
      description:
        "Track and manage your store's sales in real time. The admin panel shows every order's status, payment, and shipping info at a glance, with the option to view full details directly in Stripe.",
      features: [
        "Live order tracking",
        "Revenue and customer stats",
        "One-click access to Stripe dashboard",
      ],
      icon: "📊",
      media: "/images/4.png",
      mobileMedia: "/images/4.png",
      mediaType: "image",
    },
    {
      id: 5,
      title: "One-Click Stripe Sync",
      description:
        "Save time by syncing your products with Stripe in just one click. No need to recreate items manually; your product catalog stays connected and up to date automatically.",
      features: [
        "Sync all products at once",
        "Avoid duplicate work",
        "Always up-to-date in Stripe",
      ],
      icon: "⚡",
      media: "/images/5.png",
      mobileMedia: "/images/5.png",
      mediaType: "image",
    },
    {
      id: 6,
      title: "Unique Set Layouts",
      description:
        "Break the mold of conventional storefronts. Choose from a range of modern, elegant layouts to showcase each set with a distinct visual style, so every collection feels fresh and unique.",
      features: [
        "Multiple layout options",
        "Visually diverse presentations",
        "Sleek and modern design",
      ],
      icon: "🎨",
      media: "/videos/demos/desktop/6.mp4",
      mobileMedia: "/videos/demos/mobile/4.mp4",
      mediaType: "video",
    },
    {
      id: 7,
      title: "Editable Homepage Banners",
      description:
        "Easily create and update homepage text banners to highlight offers, announcements, or promotions. Rearrange components with simple drag-and-drop; no developer needed.",
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