"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"

export const useHeroSlideshow = () => {
  const slidePairs = [
    {
      desktop: "/videos/1-desktop.mp4",
      mobile: "/videos/1-mobile.mp4"
    },
    {
      desktop: "/videos/2-desktop.mp4", 
      mobile: "/videos/2-mobile.mp4"
    },
    {
      desktop: "/videos/3-desktop.mp4",
      mobile: "/videos/3-mobile.mp4"
    }
  ]

  const initialPlayingStates = slidePairs.reduce((acc, _, idx) => {
    acc[`desktop-${idx}`] = false
    acc[`mobile-${idx}`] = false
    return acc
  }, {} as { [key: string]: boolean })

  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeView, setActiveView] = useState<"desktop" | "mobile">("desktop")
  const [playingStates, setPlayingStates] = useState<{ [key: string]: boolean }>(initialPlayingStates)
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: false 
  })

  const toggleVideoPlayback = useCallback((videoKey: string) => {
    const video = videoRefs.current[videoKey]
    if (!video) return

    if (video.paused) {
      video.play()
      setPlayingStates(prev => ({ ...prev, [videoKey]: true }))
    } else {
      video.pause()
      setPlayingStates(prev => ({ ...prev, [videoKey]: false }))
    }
  }, [])

  const setVideoRef = useCallback((videoKey: string, element: HTMLVideoElement | null) => {
    videoRefs.current[videoKey] = element
  }, [])

  const nextSlide = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
    } else {
      setCurrentSlide(prev => (prev + 1) % slidePairs.length)
    }
  }, [emblaApi, slidePairs.length])

  const prevSlide = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev()
    } else {
      setCurrentSlide(prev => (prev - 1 + slidePairs.length) % slidePairs.length)
    }
  }, [emblaApi, slidePairs.length])

  // Sincronizar currentSlide con Embla
  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    onSelect() // Set inicial

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.6 }
  }

  const videoVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.6 }
  }

  return {
    currentSlide,
    activeView,
    setActiveView,
    nextSlide,
    prevSlide,
    slidePairs,
    fadeInUp,
    videoVariants,
    playingStates,
    toggleVideoPlayback,
    setVideoRef,
    emblaRef
  }
} 