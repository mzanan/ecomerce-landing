"use client"

import { RefObject, useEffect } from "react"

export const useViewportVideoPlayback = (
  ref: RefObject<HTMLVideoElement | null>,
  autoPlay = true
) => {
  useEffect(() => {
    const el = ref.current
    if (!el || !autoPlay || !("IntersectionObserver" in window)) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { rootMargin: "25% 0px" }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [ref, autoPlay])
}
