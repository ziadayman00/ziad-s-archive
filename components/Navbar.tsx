"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import MenuBtn from "./MenuBtn";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Simple scroll detection - no hide/show behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Hide on admin pages - MOVED AFTER ALL HOOKS
  if (pathname?.startsWith('/admin')) return null;

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Projects", href: "#projects", index: "01" },
    { name: "Experience", href: "#experience", index: "02" },
    { name: "Stack", href: "#stack", index: "03" },
    { name: "Contact", href: "#contact", index: "04" },
  ];

  return (
    <>
      {/* Main Navbar - Always Fixed and Visible */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 sm:px-6 lg:px-12 xl:px-16 ${
          isScrolled
            ? "bg-[#1a1a1a] bg-opacity-95 backdrop-blur-md py-4 "
            : "bg-transparent py-6"
        }`}
      >
        {/* Subtle top border (Existing) */}
        <div className={`absolute top-0 left-0 right-0 h-[1px] bg-[#e8e6e0] transition-opacity duration-300 ${
          isScrolled ? 'opacity-10' : 'opacity-0'
        }`} />

        {/* --- NEW BOTTOM BORDER --- */}
        <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-[#e8e6e0] transition-all duration-500 ${
          isScrolled ? 'opacity-10 scale-x-100' : 'opacity-0 scale-x-95'
        }`} />

        <div className="flex items-center justify-between max-w-[1600px] mx-auto">
          {/* Logo with Archive Label */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <Logo />
            </div>
            {isScrolled && (
              <div className="hidden md:flex items-center gap-2 animate-fadeIn">
                <div className="w-px h-4 bg-gradient-to-b from-transparent via-[#e8e6e0] to-transparent opacity-40" />
                <div className="flex flex-col">
                  <span className="text-[#e8e6e0] opacity-40 text-[10px] tracking-[0.2em] font-mono leading-tight">
                    ARCHIVE.2025
                  </span>
                  <span className="text-[#e8e6e0] opacity-20 text-[8px] tracking-[0.15em] font-mono">
                    PORTFOLIO
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Menu Button with Status Indicator */}
          <div className="flex items-center gap-3 sm:gap-4">
            {isScrolled && (
              <div className="hidden sm:flex items-center gap-2 animate-fadeIn">
                <div className="relative">
                  <div className="w-2 h-2 bg-[#e8e6e0] opacity-60 rounded-full" />
                  <div className="absolute inset-0 w-2 h-2 bg-[#e8e6e0] opacity-60 rounded-full animate-ping" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#e8e6e0] opacity-40 text-[10px] tracking-[0.15em] font-mono leading-tight">
                    AVAILABLE
                  </span>
                  <span className="text-[#e8e6e0] opacity-20 text-[8px] tracking-[0.1em] font-mono">
                    FOR HIRE
                  </span>
                </div>
              </div>
            )}
            <MenuBtn isOpen={isMenuOpen} onClick={handleMenuClick} />
          </div>
        </div>
      </nav>

      {/* Enhanced Fullscreen Menu Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-[#1a1a1a] transition-all duration-700 ease-in-out ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Animated decorative grid background */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${
          isMenuOpen ? 'opacity-[0.04]' : 'opacity-0'
        }`}>
          <div
            className="h-full w-full animate-gridPulse"
            style={{
              backgroundImage: `linear-gradient(#e8e6e0 1px, transparent 1px), linear-gradient(90deg, #e8e6e0 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Radial gradient overlay */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0'
        }`}
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(26, 26, 26, 0.3) 100%)'
          }}
        />

        {/* Archive Header in Menu */}
        <div className={`absolute top-24 sm:top-28 left-1/2 -translate-x-1/2 w-[calc(100%-4rem)] max-w-[1200px] flex items-center justify-between pointer-events-none px-4 sm:px-0 pt-2 sm:pt-0 transition-all duration-700 ${
          isMenuOpen ? 'opacity-30 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="text-[#e8e6e0] text-[10px] tracking-[0.3em] font-mono">
            <div>NAVIGATION</div>
            <div className="mt-1 text-[8px]">—————————</div>
          </div>
          <div className="text-[#e8e6e0] text-[10px] tracking-[0.3em] font-mono text-right">
            <div>MENU</div>
            <div className="mt-1 text-[8px]">—————————</div>
          </div>
        </div>

        {/* Menu Content */}
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="w-full max-w-4xl">
            <ul className="space-y-4 sm:space-y-6 text-center">
              {navLinks.map((link, index) => (
                <li
                  key={link.name}
                  className={`transition-all duration-700 ${
                    isMenuOpen
                      ? "opacity-100 translate-y-0 blur-0"
                      : "opacity-0 translate-y-12 blur-sm"
                  }`}
                  style={{ transitionDelay: `${index * 100 + 200}ms` }}
                >
                  <a
                    href={link.href}
                    className="group relative inline-flex items-center gap-6 sm:gap-8 px-4 py-2 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {/* Index Number with animated underline */}
                    <span className="relative text-[#e8e6e0] opacity-30 text-sm sm:text-base font-mono group-hover:opacity-60 transition-all duration-300">
                      {link.index}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#e8e6e0] group-hover:w-full transition-all duration-300" />
                    </span>

                    {/* Link Name with enhanced effects */}
                    <span className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#e8e6e0] group-hover:translate-x-3 transition-all duration-500">
                      {link.name}
                      {/* Animated highlight bar */}
                      <span className="absolute inset-x-0 -bottom-1 sm:-bottom-2 h-2 sm:h-3 bg-[#e8e6e0] opacity-0 group-hover:opacity-10 scale-x-0 group-hover:scale-x-100 transition-all duration-500 origin-left" />
                      {/* Glitch effect on hover */}
                      <span className="absolute inset-0 text-[#e8e6e0] opacity-0 group-hover:opacity-20 transition-opacity duration-100"
                        style={{
                          textShadow: '2px 0 #e8e6e0, -2px 0 #e8e6e0'
                        }}
                      >
                        {link.name}
                      </span>
                    </span>

                    {/* Enhanced Arrow Icon */}
                    <div className="relative">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-[#e8e6e0] opacity-0 group-hover:opacity-60 -translate-x-6 group-hover:translate-x-0 transition-all duration-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      {/* Arrow trail effect */}
                      <svg
                        className="absolute top-0 left-0 w-5 h-5 sm:w-6 sm:h-6 text-[#e8e6e0] opacity-0 group-hover:opacity-20 -translate-x-8 group-hover:-translate-x-2 transition-all duration-500 delay-75"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Side Decorations with animation */}
        <div className={`absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 hidden lg:block transition-all duration-700 delay-500 ${
          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}>
          <div className="flex flex-col gap-3 text-[#e8e6e0] opacity-20 text-[10px] tracking-[0.2em] font-mono -rotate-90 origin-left">
            <span>SCROLL TO NAVIGATE</span>
          </div>
        </div>

        <div className={`absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 hidden lg:block transition-all duration-700 delay-500 ${
          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}>
          <div className="flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="relative w-1.5 h-1.5 border border-[#e8e6e0] opacity-20 hover:opacity-60 hover:bg-[#e8e6e0] transition-all duration-300 group"
                style={{
                  transitionDelay: `${i * 50}ms`
                }}
              >
                {/* Expanding ring on hover */}
                <span className="absolute inset-0 border border-[#e8e6e0] opacity-0 group-hover:opacity-40 scale-0 group-hover:scale-[3] transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>

        {/* Available for Work & EST. 2025 */}
        <div
          className={`absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 sm:gap-6 text-[#e8e6e0] opacity-30 text-[10px] tracking-[0.2em] font-mono transition-all duration-700 delay-700 whitespace-nowrap ${
            isMenuOpen ? "opacity-30 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"
          }`}
        >
          <span>AVAILABLE FOR WORK</span>
          <span className="animate-pulse">•</span>
          <span>EST. 2025</span>
        </div>

        {/* Archive Footer */}
        <div className={`absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-[#e8e6e0] opacity-30 text-xs sm:text-sm tracking-[0.3em] font-light transition-all duration-700 delay-800 ${
          isMenuOpen ? 'opacity-30 scale-100' : 'opacity-0 scale-90'
        }`}>
          — ARCHIVE —
        </div>

        {/* Animated Corner Markers */}
        <div className={`absolute top-24 sm:top-28 left-8 w-8 h-8 border-t border-l border-[#e8e6e0] opacity-10 pointer-events-none transition-all duration-700 ${
          isMenuOpen ? 'scale-100 opacity-10' : 'scale-0 opacity-0'
        }`} />
        <div className={`absolute top-24 sm:top-28 right-8 w-8 h-8 border-t border-r border-[#e8e6e0] opacity-10 pointer-events-none transition-all duration-700 delay-100 ${
          isMenuOpen ? 'scale-100 opacity-10' : 'scale-0 opacity-0'
        }`} />
        <div className={`absolute bottom-8 left-8 w-8 h-8 border-b border-l border-[#e8e6e0] opacity-10 transition-all duration-700 delay-200 ${
          isMenuOpen ? 'scale-100 opacity-10' : 'scale-0 opacity-0'
        }`} />
        <div className={`absolute bottom-8 right-8 w-8 h-8 border-b border-r border-[#e8e6e0] opacity-10 transition-all duration-700 delay-300 ${
          isMenuOpen ? 'scale-100 opacity-10' : 'scale-0 opacity-0'
        }`} />
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes gridPulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-gridPulse {
          animation: gridPulse 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Navbar;