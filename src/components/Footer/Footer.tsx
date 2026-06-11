"use client"

import { COMPANY } from "@/lib/socials"

const ATTRIBUTION_URL = "https://itsmatias.com"
const ATTRIBUTION_NAME = "itsmatias.com"

export const Footer = () => (
  <footer className="absolute inset-x-0 bottom-0 z-10 py-3 text-xs text-muted-foreground">
    <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-1">
      <span>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</span>
      <a
        href={ATTRIBUTION_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-foreground transition-colors"
      >
        Built by {ATTRIBUTION_NAME}
      </a>
    </div>
  </footer>
)
