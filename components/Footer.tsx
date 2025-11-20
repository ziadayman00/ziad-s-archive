"use client";
import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/ziadayman00",
      icon: (
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/ziad-ayman-6249122a4",
      icon: (
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      ),
    }
  ];

  const contactInfo = [
    {
      label: "Email",
      value: "zyadd.aymann@gmail.com",
      href: "mailto:zyadd.aymann@gmail.com",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      ),
    },
    {
      label: "Phone",
      value: "+20 1016522661",
      href: "tel:+201016522661",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      ),
    },
    {
      label: "Location",
      value: "Dakahlia, Egypt",
      href: null,
      icon: (
        <>
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
        </>
      ),
    }
  ];

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

      {/* Archive Markers */}
      <div className="absolute top-8 sm:top-12 left-4 sm:left-6 lg:left-12 xl:left-16 text-cream opacity-20 text-[10px] tracking-[0.3em] font-mono">
        <div>SEC.04</div>
        <div className="mt-1 text-[8px]">————</div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-20 sm:py-24 md:py-28">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 sm:gap-4 mb-8">
            <div className="w-8 sm:w-12 h-[1px] bg-cream opacity-30" />
            <span className="text-cream text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] opacity-40 font-mono whitespace-nowrap">
              LET'S CONNECT
            </span>
          </div>

          <h2 className="text-[clamp(3rem,10vw,8rem)] font-black text-cream leading-[0.9] tracking-[-0.01em] mb-6">
            GET IN
            <br />
            <span className="inline-block mt-1 sm:mt-2 md:mt-3">TOUCH</span>
          </h2>

          <div className="flex items-center gap-3 sm:gap-4 max-w-xl">
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-cream opacity-30" />
            <p className="text-cream opacity-50 text-xs sm:text-sm font-light tracking-wide">
              Available for freelance opportunities and collaborations
            </p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 mb-16 md:mb-20">
          {/* Left Section - About & Social */}
          <div className="space-y-8 sm:space-y-10">
            {/* Logo */}
            <div className="space-y-4">
              <div className="text-cream opacity-40 text-[10px] tracking-[0.2em] font-mono mb-4">
                BRAND
              </div>
              <div className="w-32 md:w-40">
                <Image
                  src="/logo.svg"
                  alt="Ziad Ayman"
                  width={160}
                  height={40}
                  className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4 border-l-2 border-cream border-opacity-10 pl-6">
              <div className="text-cream opacity-40 text-[10px] tracking-[0.2em] font-mono">
                ABOUT
              </div>
              <p className="text-cream opacity-60 text-sm md:text-base max-w-md leading-relaxed">
                Frontend Developer specializing in React, Next.js, and modern web
                technologies. Building responsive, user-friendly interfaces with
                attention to detail and creative vision.
              </p>
            </div>

            {/* Social Links - Minimal Style */}
            <div className="space-y-4">
              <div className="text-cream opacity-40 text-[10px] tracking-[0.2em] font-mono">
                SOCIAL LINKS
              </div>
              <div className="flex flex-wrap gap-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 hover:translate-x-1 transition-transform duration-300"
                  >
                    <svg
                      className="w-5 h-5 text-cream opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {social.icon}
                    </svg>
                    <span className="text-cream opacity-70 group-hover:opacity-100 text-sm transition-opacity duration-300">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Contact Info */}
          <div className="space-y-8 sm:space-y-10">
            <div className="space-y-6">
              <div className="text-cream opacity-40 text-[10px] tracking-[0.2em] font-mono">
                CONTACT INFORMATION
              </div>
              <div className="space-y-6">
                {contactInfo.map((contact) => (
                  <div key={contact.label}>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="group block hover:translate-x-2 transition-transform duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <svg
                            className="w-5 h-5 text-cream opacity-60 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 mt-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            {contact.icon}
                          </svg>
                          <div className="flex-1 min-w-0">
                            <span className="text-cream opacity-40 text-[10px] tracking-[0.15em] font-mono block mb-1">
                              {contact.label.toUpperCase()}
                            </span>
                            <p className="text-cream opacity-70 group-hover:opacity-100 text-sm break-all transition-opacity duration-300">
                              {contact.value}
                            </p>
                          </div>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-4">
                        <svg
                          className="w-5 h-5 text-cream opacity-60 flex-shrink-0 mt-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {contact.icon}
                        </svg>
                        <div className="flex-1">
                          <span className="text-cream opacity-40 text-[10px] tracking-[0.15em] font-mono block mb-1">
                            {contact.label.toUpperCase()}
                          </span>
                          <p className="text-cream opacity-70 text-sm">
                            {contact.value}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="border-l-2 border-cream border-opacity-20 pl-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 bg-cream opacity-60 animate-pulse" />
                <span className="text-cream opacity-40 text-[10px] tracking-[0.2em] font-mono">
                  CURRENT STATUS
                </span>
              </div>
              <p className="text-cream opacity-80 text-sm font-bold">
                Available for new projects
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="h-[1px] flex-1 bg-cream opacity-20" />
            <span className="text-cream text-[10px] tracking-[0.2em] sm:tracking-[0.3em] opacity-40 font-mono">
              ARCHIVE FOOTER
            </span>
            <div className="h-[1px] flex-1 bg-cream opacity-20" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6 pt-6">
            {/* Copyright */}
            <div>
              <div className="text-cream opacity-30 text-[9px] tracking-[0.15em] font-mono mb-2">
                COPYRIGHT
              </div>
              <p className="text-cream opacity-60 text-xs">
                © {currentYear} ZIAD AYMAN
              </p>
            </div>

            {/* Built With */}
            <div>
              <div className="text-cream opacity-30 text-[9px] tracking-[0.15em] font-mono mb-2">
                BUILT WITH
              </div>
              <p className="text-cream opacity-60 text-xs">
                NEXT.JS • TAILWIND • PASSION
              </p>
            </div>

            {/* Version */}
            <div>
              <div className="text-cream opacity-30 text-[9px] tracking-[0.15em] font-mono mb-2">
                VERSION
              </div>
              <p className="text-cream opacity-60 text-xs">
                PORTFOLIO V4.0 • 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;