# Ecommerce Landing Page

A modern, responsive marketing landing page built with Next.js 15 (App Router), TypeScript and Tailwind CSS. It showcases a product through animated sections — hero, video demos, features, FAQ — and captures leads through a Formspree-backed contact form.

## Features

- Modern, responsive design with smooth per-element animations (Motion).
- Video demos rendered inside a phone mockup with lazy loading.
- Contact form powered by Formspree (no backend required).
- SEO ready: Open Graph image, sitemap, robots and structured data.
- Full TypeScript with strict linting.
- Optimized with Next.js 15 and Turbopack.

## Quick Start

### Prerequisites

- Node.js 18+
- npm
- A Formspree form ID

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd ecommerce-landing
```

2. Install dependencies

```bash
npm install
```

3. Environment setup

```bash
cp .env.example .env.local
```

Configure your `.env.local`:

```bash
# App Configuration - REQUIRED
# Development: http://localhost:3000
# Production: https://your-domain.com
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Formspree
NEXT_PUBLIC_FORMSPREE_FORM_ID=your_formspree_form_id
```

4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## Architecture

### Tech Stack

- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Animation: Motion
- Contact form: Formspree
- Icons: Lucide React
- Fonts: Geist Sans & Geist Mono

### Project Structure

```
src/
├── app/                  # App Router (routes, layout, global styles, SEO)
│   ├── layout.tsx
│   ├── page.tsx          # Landing page composition
│   ├── globals.css       # Design tokens + utilities
│   ├── opengraph-image.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── ui/               # Reusable primitives
│   ├── Header/           # Navigation header
│   ├── Hero/             # Hero section
│   ├── Demo/             # Video demos
│   ├── Features/         # Feature highlights
│   ├── Contact/          # Formspree contact form
│   ├── FAQ/              # Frequently asked questions
│   ├── CTA/              # Call to action
│   ├── PhoneMockup/      # Phone frame for demo videos
│   ├── LazyVideo/        # Lazy-loaded video player
│   ├── seo/              # Structured data
│   └── styles/           # Button primitives
├── hooks/                # Cross-feature hooks
├── lib/                  # Pure utilities
└── types/                # Shared type definitions

public/                   # Static assets (videos, images, icons)
```

## Contact Form

The contact form submits directly to [Formspree](https://formspree.io). Set `NEXT_PUBLIC_FORMSPREE_FORM_ID` to your form ID and submissions are delivered to the email configured in your Formspree dashboard. No server-side code or SMTP setup is required.

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel.
2. Configure the environment variables in the Vercel dashboard.
3. Push to deploy automatically.

### Manual Deployment

```bash
npm run build
npm run start
```
