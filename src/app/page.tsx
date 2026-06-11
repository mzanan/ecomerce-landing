"use client"

import dynamic from "next/dynamic"

import { Header } from "@/components/Header/Header"
import { Hero } from "@/components/Hero/Hero"
import { FAQ } from "@/components/FAQ/FAQ"
import { Features } from "@/components/Features/Features"
import { Contact } from "@/components/Contact/Contact"
import { Footer } from "@/components/Footer/Footer"

const Demo = dynamic(() => import("@/components/Demo/Demo").then((m) => m.Demo))

export default function Home() {
  return (
    <div className="h-dvh bg-main-gradient overflow-y-scroll snap-y snap-mandatory overflow-x-hidden">
      <div className="fixed inset-0 opacity-10 pointer-events-none bg-grid-pattern" />
      <Header />

      <div className="flex flex-col gap-20">
        <Hero />
        <Demo />
        <Features />
        <Contact />
        <div className="relative">
          <FAQ />
          <Footer />
        </div>
      </div>
    </div>
  )
}
