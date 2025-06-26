"use client"

import { motion } from "framer-motion"
import { PrimaryButton, LinkButton } from "@/components/styles/buttons"
import { useHeader } from "./useHeader"
import { COMPANY } from "@/lib/socials"

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
          <LinkButton 
            variant="brand"
            onClick={() => window.location.href = "/"}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-bold text-black">{COMPANY.name}</span>
            </div>
          </LinkButton>
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <LinkButton
                key={`${item.href}-${index}`}
                variant="nav"
                onClick={() => {
                  const sectionId = item.href.replace('#', '')
                  document.getElementById(sectionId)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  })
                }}
              >
                {item.label}
              </LinkButton>
            ))}
          </nav>
          <div className="flex items-center">
            <PrimaryButton 
              onClick={() => {
                document.getElementById('pricing')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                })
              }}
            >
              Start Your Store Today
            </PrimaryButton>
          </div>
        </div>
      </motion.div>
    </header>
  )
} 