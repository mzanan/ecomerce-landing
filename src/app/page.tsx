"use client"

import { Header } from "@/components/Header/Header"
import { Hero } from "@/components/Hero/Hero"
import { HeroSlideshow } from "@/components/HeroSlideshow/HeroSlideshow"
import { Pricing } from "@/components/Pricing/Pricing"
import { FAQ } from "@/components/FAQ/FAQ"
import { Demo } from "@/components/Demo/Demo"
import { Contact } from "@/components/Contact/Contact"
import { CTA } from "@/components/CTA/CTA"
import { Footer } from "@/components/Footer/Footer"

export default function EcommerceSaaSLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50 to-pink-300">
      <div className="fixed inset-0 opacity-10 pointer-events-none bg-grid-pattern" />
      <Header />
      
      <div className="flex flex-col gap-20 snap-y snap-mandatory overflow-y-auto overflow-x-hidden">
        <Hero />
        <HeroSlideshow />
        <Pricing />
        <Demo />
        <FAQ />
        <Contact />
        <CTA />
      </div>
      
      <Footer />
    </div>
  )
}
