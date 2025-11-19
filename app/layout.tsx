// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  metadataBase: new URL("https://your-domain.com"),
  title: {
    default: "Ziad's Archive",
    template: "%s | Ziad's Archive",
  },
  description: "Creating clean, interactive, and motion-driven web experiences.",
  icons: {
    icon: "/icon.svg", // favicon
  },
  openGraph: {
    title: "Ziad's Archive",
    description: "Creating clean, interactive, and motion-driven web experiences.",
    url: "https://your-domain.com",
    siteName: "Ziad's Archive",
    images: [
      {
        url: "/og-image.jpg",
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
    images: ["/og-image.png"],
  },
};

// Root Layout Component
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
