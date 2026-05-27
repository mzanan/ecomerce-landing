# CLAUDE.md — Ecomerce Landing

Landing de marketing/venta del template de ecommerce. Contexto completo y backlog en `~/Documents/projects/personal/personal-brain/01-Projects/06-ecomerce-landing/`.

Nota: el package.json se llama `infideli-landing` (legacy), pero el proyecto vivo es la landing de ecommerce.

## Stack

Next 15 · React 19 · TypeScript · Tailwind v4 · Turbopack · Stripe · nodemailer · Radix · `motion/react` (paquete `motion`, ex framer-motion) · Embla.

## Comandos

```bash
npm run dev          # next dev --turbopack
npm run build
npm run lint         # next lint
npm run format       # prettier --write .
```

## Paths críticos

- `src/lib/email.ts` — nodemailer + template HTML.
- `src/app/api/contact/route.ts` — endpoint de contacto.
- `src/app/api/products/route.ts` — fetch productos Stripe.
- `src/app/api/checkout-sessions/route.ts` — checkout.
- `src/app/api/webhooks/stripe/route.ts` — webhook.
- `scripts/create-stripe-products.js` — seed de productos en la cuenta Stripe.
- `src/components/Header/Header.tsx` + `useHeader.ts` — nav (bug hash url).
- `src/components/{Demo,Pricing,Features,Hero}/` — secciones.

## Env vars

`SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD` (Gmail App Password — vence/rota), `SMTP_FROM_EMAIL`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`.

## Convenciones del proyecto

- Si Pricing muestra "No products available": la cuenta Stripe no tiene productos activos → correr el script de seed.
- Error 535-5.7.8 BadCredentials = Gmail App Password vencida → regenerar.
- Componentes en pares `Component.tsx` + `useComponent.ts`.
- Contact form se mantiene formal/B2B (a diferencia del portfolio).
- Animaciones: `import { motion } from "motion/react"` (NO `framer-motion`).
- Videos: `<video preload="none" poster={src.replace(/\.mp4$/, '.webp')}>`. `LazyVideo` existe en `src/components/LazyVideo/` pero NO se usa en PhoneMockup/Features (dependen de `setVideoRef` del padre).
- Build local: necesita `NEXT_PUBLIC_APP_URL` seteado (el layout tira si falta).

## Heurísticas

- No commits ni PRs sin confirmación.
