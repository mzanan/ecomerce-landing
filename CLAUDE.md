# CLAUDE.md — Ecommerce Landing

Marketing landing page for the NOIR ecommerce template. Context: `~/Documents/projects/personal/personal-brain/01-Projects/06-ecommerce-landing/`.

No backend, no DB, no payments. Buy CTA goes to `itsmatias.com/#projects` (Polar checkout in portfolio). Contact via Formspree.

## Stack

Next 16 · React 19 · TypeScript · Tailwind v4 · Turbopack · `motion/react` · Embla · Formspree · shadcn.

## Commands

```bash
npm run dev          # next dev --turbopack
npm run build
npm run lint         # eslint
npm run format       # prettier --write .
```

## Paths

- `src/components/{Header,Hero,Demo,Features,Contact,FAQ,Footer}/` — sections, each `Component.tsx` + `useComponent.ts`.
- `src/components/seo/` — JSON-LD structured data.
- `src/app/page.tsx` — single-page layout (snap scroll, 6 sections).

## Conventions

- Components in pairs `Component.tsx` + `useComponent.ts`.
- Animations: `import { motion } from "motion/react"` (not framer-motion).
- Videos: `<video preload="none" poster={src.replace(/\.mp4$/, '.webp')}>`, `motion/react` for animations.
- Contact form via Formspree (`@formspree/react`), dedicated form id.

## Env vars

`NEXT_PUBLIC_FORMSPREE_FORM_ID`, `NEXT_PUBLIC_APP_URL`.
