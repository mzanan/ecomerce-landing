import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const scrollToSection = (hash: string, onHashChange?: (hash: string) => void) => {
  const element = document.querySelector(hash)
  if (element) {
    window.history.pushState(null, '', hash)
    if (onHashChange) {
      onHashChange(hash)
    }
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
