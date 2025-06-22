"use client"

import { Header } from "@/components/Header/Header"
import { Hero } from "@/components/Hero/Hero"
import { Features } from "@/components/Features/Features"
import { Pricing } from "@/components/Pricing/Pricing"
import { Demo } from "@/components/Demo/Demo"
import { Contact } from "@/components/Contact/Contact"
import { CTA } from "@/components/CTA/CTA"


export default function EcommerceSaaSLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50 to-pink-300">
      <div className="fixed inset-0 opacity-10 pointer-events-none bg-grid-pattern" />
      <Header />
      
      <div className="snap-y snap-proximity overflow-y-auto">
        <Hero />
        <Features />
        <Pricing />
        <Demo />
        <Contact />
        <CTA />
      </div>
    </div>
  )
}
