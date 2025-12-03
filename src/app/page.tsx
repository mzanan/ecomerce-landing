"use client"

import { Header } from "@/components/Header/Header"
import { Hero } from "@/components/Hero/Hero"
import { Demo } from "@/components/Demo/Demo"
import { Pricing } from "@/components/Pricing/Pricing"
import { FAQ } from "@/components/FAQ/FAQ"
import { Features } from "@/components/Features/Features"
import { Contact } from "@/components/Contact/Contact"

export default function Home() {
  return (
    <div className="h-dvh bg-main-gradient overflow-y-scroll snap-y snap-mandatory overflow-x-hidden">
      <div className="fixed inset-0 opacity-10 pointer-events-none bg-grid-pattern" />
      <Header />

      <div className="flex flex-col gap-20">
        <Hero />
        <Demo />
        <Features />
        <Pricing />
        <Contact />
        <FAQ />
      </div>
    </div>
  )
}
