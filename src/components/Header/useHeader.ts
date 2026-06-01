"use client"

import { scrollToSection as scrollToSectionUtil } from "@/lib/utils"
import { useState, useEffect, useCallback, useMemo } from "react"

interface NavigationItem {
  href: string
  label: string
}

export const useHeader = () => {
  const [activeSection, setActiveSection] = useState<string>("")

  const navigationItems: NavigationItem[] = useMemo(() => [
    { href: "#demo", label: "Demo" },
    { href: "#features", label: "Features" },
    { href: "#contact", label: "Contact" },
    { href: "#faq", label: "FAQ" },
  ], [])

  useEffect(() => {
    const order = navigationItems.map((item) => item.href.replace("#", ""))
    const sections = order
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const visible = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        })

        const current = order.find((id) => visible.has(id))
        if (current) setActiveSection(`#${current}`)
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [navigationItems])

  const scrollToSection = useCallback((hash: string) => {
    scrollToSectionUtil(hash, (newHash) => {
      setActiveSection(newHash)
    })
  }, [])

  return {
    navigationItems,
    scrollToSection,
    activeSection,
  }
}
