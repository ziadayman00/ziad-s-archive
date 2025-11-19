"use client";
import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative bg-background border-t border-cream border-opacity-10">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(var(--color-cream) 1px, transparent 1px), linear-gradient(90deg, var(--color-cream) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 mb-12">
          {/* Left Section - Logo & Description */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="w-32 md:w-40">
              <Image
                src="/logo.svg"
                alt="Ziad Ayman"
                width={160}
                height={40}
                className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>

            {/* Description */}
            <p className="text-cream opacity-60 text-sm md:text-base max-w-md leading-relaxed">
              Frontend Developer specializing in React, Next.js, and modern web
              technologies. Building responsive, user-friendly interfaces with
              attention to detail.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/ziadayman00"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-10 h-10 border border-cream border-opacity-30 flex items-center justify-center hover:border-opacity-100 transition-all duration-300"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5 text-cream opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com/in/ziad-ayman-6249122a4"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-10 h-10 border border-cream border-opacity-30 flex items-center justify-center hover:border-opacity-100 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5 text-cream opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Section - Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-black text-cream tracking-tight mb-6">
              GET IN TOUCH
            </h3>

            <div className="space-y-4">
              {/* Email */}
              <a
                href="mailto:zyadd.aymann@gmail.com"
                className="group flex items-start gap-3 hover:translate-x-2 transition-transform duration-300"
              >
                <div className="w-5 h-5 border border-cream border-opacity-30 flex items-center justify-center mt-0.5 group-hover:border-opacity-100 transition-all duration-300">
                  <svg
                    className="w-3 h-3 text-cream opacity-60 group-hover:opacity-100"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-cream opacity-40 text-xs tracking-wider uppercase mb-1">
                    Email
                  </p>
                  <p className="text-cream opacity-70 text-sm group-hover:opacity-100 transition-opacity duration-300">
                    zyadd.aymann@gmail.com
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+201016522661"
                className="group flex items-start gap-3 hover:translate-x-2 transition-transform duration-300"
              >
                <div className="w-5 h-5 border border-cream border-opacity-30 flex items-center justify-center mt-0.5 group-hover:border-opacity-100 transition-all duration-300">
                  <svg
                    className="w-3 h-3 text-cream opacity-60 group-hover:opacity-100"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-cream opacity-40 text-xs tracking-wider uppercase mb-1">
                    Phone
                  </p>
                  <p className="text-cream opacity-70 text-sm group-hover:opacity-100 transition-opacity duration-300">
                    +20 1016522661
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="group flex items-start gap-3">
                <div className="w-5 h-5 border border-cream border-opacity-30 flex items-center justify-center mt-0.5">
                  <svg
                    className="w-3 h-3 text-cream opacity-60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-cream opacity-40 text-xs tracking-wider uppercase mb-1">
                    Location
                  </p>
                  <p className="text-cream opacity-70 text-sm">
                    Dakahlia, Egypt
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cream border-opacity-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-cream opacity-40 text-xs md:text-sm tracking-wider">
              © {currentYear} ZIAD AYMAN. ALL RIGHTS RESERVED.
            </p>
            <p className="text-cream opacity-40 text-xs md:text-sm tracking-wider font-mono">
              DESIGNED & DEVELOPED WITH PASSION
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;