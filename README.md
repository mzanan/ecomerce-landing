# 🛍️ Ecommerce Landing Page

A modern, professional ecommerce landing page built with Next.js 15, featuring secure Stripe payments, automated email notifications, and beautiful UI components.

## ✨ Features

- **🎨 Modern Design**: Beautiful, responsive landing page with smooth animations
- **💳 Secure Payments**: Full Stripe integration with payment intents and webhooks
- **📧 Email Notifications**: Automated order confirmations via SMTP (Gmail)
- **🛡️ Type Safety**: Full TypeScript implementation with strict linting
- **🎯 SEO Optimized**: Open Graph, Twitter Cards, and meta tags
- **📱 Mobile First**: Responsive design that works on all devices
- **⚡ Performance**: Optimized with Next.js 15 and Turbopack

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Gmail account (for SMTP)
- Stripe account

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ecommerce-landing
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

Configure your `.env.local`:
```bash
# App Configuration - REQUIRED
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_ENDPOINT=https://your-project.supabase.co/functions/v1/stripe-webhook

# SMTP Gmail Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USERNAME=your-gmail@gmail.com
SMTP_PASSWORD=your-gmail-app-password
SMTP_FROM_EMAIL=your-gmail@gmail.com
```

4. **Setup Stripe Products**
```bash
node scripts/create-stripe-products.js
```

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🛠️ Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Payments**: Stripe
- **Email**: SMTP (Gmail)
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── checkout/          # Payment pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── Header/           # Navigation header
│   ├── Pricing/          # Pricing section
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
└── types/                # TypeScript type definitions

public/                    # Static assets
├── icon.svg              # Logo
├── og-default.jpg        # Open Graph image
└── favicon.ico           # Favicon

scripts/                   # Utility scripts
└── create-stripe-products.js
```

## 💰 Payment Flow

1. **Product Selection**: Users choose pricing plans
2. **Stripe Checkout**: Secure payment processing
3. **Webhook Handling**: Automated order processing
4. **Email Notifications**: Order confirmations sent via SMTP
5. **Success Page**: Professional confirmation with next steps

## 📧 Email System

- **SMTP Provider**: Gmail
- **Templates**: Professional HTML emails
- **Triggers**: Order confirmations, payment processing
- **Security**: App passwords for Gmail authentication

## 🔒 Security

- **Environment Variables**: Sensitive data properly secured
- **Stripe Webhooks**: Signature verification
- **Type Safety**: Full TypeScript coverage
- **Input Validation**: Zod schemas for form validation

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically

### Manual Deployment

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email support@example.com or create an issue in the repository.

---

Built with ❤️ using Next.js, Stripe, and modern web technologies.
