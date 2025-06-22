interface NavigationItem {
  href: string
  label: string
}

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