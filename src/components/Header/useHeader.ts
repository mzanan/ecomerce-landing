import { NavigationItem } from "@/types"

export const useHeader = () => {
  const navigationItems: NavigationItem[] = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#demo", label: "Demo" },
    { href: "#contact", label: "Contact" },
  ]

  return {
    navigationItems,
  }
} 