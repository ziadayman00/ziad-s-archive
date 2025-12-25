// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioLoader from "@/components/PortfolioLoader";

// Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO-friendly metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://ziad-s-archive.vercel.app"),
  title: {
    default: "Ziad's Archive",
    template: "%s | Ziad's Archive",
  },
  description: "Creating clean, interactive, and motion-driven web experiences.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Ziad's Archive",
    description: "Creating clean, interactive, and motion-driven web experiences.",
    url: "https://ziad-s-archive.vercel.app",
    siteName: "Ziad's Archive",
    images: [
      {
        url: "/og-image.png", // Make sure this file exists in /public folder
        width: 1200,
        height: 630,
        alt: "Ziad's Archive - Frontend Developer Portfolio",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ziad's Archive",
    description: "Creating clean, interactive, and motion-driven web experiences.",
    images: ["/og-image.png"], // Same file as Open Graph
    creator: "@zeyad_ayman6",
  },
  alternates: {
    canonical: "https://ziad-s-archive.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Root Layout Component
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PortfolioLoader />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}