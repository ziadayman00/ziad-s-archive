// app/layout.tsx
import type { Metadata } from "next";
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
    icon: "/icon.svg", // Use only this SVG favicon
  },
  openGraph: {
    title: "Ziad's Archive",
    description: "Creating clean, interactive, and motion-driven web experiences.",
    url: "https://ziad-s-archive.vercel.app",
    siteName: "Ziad's Archive",
    images: [
      {
        url: "https://ziad-s-archive.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ziad's Archive",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ziad's Archive",
    description: "Creating clean, interactive, and motion-driven web experiences.",
    images: ["https://ziad-s-archive.vercel.app/og-image.png"],
  },
  alternates: {
    canonical: "https://ziad-s-archive.vercel.app",
  },
  viewport: "width=device-width, initial-scale=1",
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
