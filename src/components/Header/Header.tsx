"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useHeader } from "./useHeader"

export const Header = () => {
  const { navigationItems } = useHeader()

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4">
      <motion.div
        className="relative rounded-full shadow-lg overflow-hidden bg-white/30 backdrop-blur-md border border-white/30"
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: false }}
        style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none"></div>

        <div className="relative px-6 flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-black">
            GVT Devs
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <Link
                key={`${item.href}-${index}`}
                href={item.href}
                className="transition-all duration-300 text-sm px-4 py-2 rounded-full text-black hover:bg-black/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center">
            <Button className="font-medium px-6 py-2 rounded-full text-sm transition-all duration-300 bg-black text-white hover:bg-black/80">
              Start Your Store Today
            </Button>
          </div>
        </div>
      </motion.div>
    </header>
  )
} 