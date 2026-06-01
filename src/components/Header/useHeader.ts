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
    const updateActiveSection = () => {
      const hash = window.location.hash
      if (hash) {
        setActiveSection(hash)
      } else {
        setActiveSection("")
      }
    }

    const handleScroll = () => {
      const sections = navigationItems.map(item => item.href.replace('#', ''))
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element) {
          const offsetTop = element.offsetTop
          if (scrollPosition >= offsetTop) {
            setActiveSection(`#${sections[i]}`)
            return
          }
        }
      }
    }

    updateActiveSection()
    window.addEventListener("hashchange", updateActiveSection)
    window.addEventListener("popstate", updateActiveSection)
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener("hashchange", updateActiveSection)
      window.removeEventListener("popstate", updateActiveSection)
      window.removeEventListener("scroll", handleScroll)
    }
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