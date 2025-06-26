"use client"

import { COMPANY } from "@/lib/socials"

export const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 mt-16 py-6 text-sm text-center ">
      <p>
        © {new Date().getFullYear()} {COMPANY.name} — Built with Next.js, Tailwind & Supabase
      </p>
    </footer>
  )
} 