import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "@/components/ui/sonner";
import { StructuredData } from "@/components/seo/StructuredData";
import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL;
if (!appUrl) {
  throw new Error('NEXT_PUBLIC_APP_URL environment variable is required');
}

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "MZ Dev - Ecommerce Solutions",
    template: "MZ Dev - %s",
  },
  description: "Professional ecommerce landing pages and solutions. Build your online store with modern design and secure payments.",
  keywords: "ecommerce, landing page, online store, web development, payments",
  authors: [{ name: "Matias Zanan" }],
  creator: "Matias Zanan",
  publisher: "Matias Zanan",
  robots: "index, follow",
  openGraph: {
    type: "website",
    siteName: "Matias Zanan",
    title: "Matias Zanan - Ecommerce Solutions",
    description: "Professional ecommerce landing pages and solutions. Build your online store with modern design and secure payments.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matias Zanan - Ecommerce Solutions",
    description: "Professional ecommerce landing pages and solutions.",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <StructuredData />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
