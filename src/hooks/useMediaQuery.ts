"use client"

import { useEffect, useState } from "react"

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean | null>(null)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [query])

  return matches
}
