"use client";
import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import MenuBtn from "./MenuBtn";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Calculate scroll progress
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
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
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-12 xl:px-16 ${
          isScrolled
            ? "bg-[#001b24] bg-opacity-95 backdrop-blur-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#fafbd7] opacity-10">
          <div 
            className="h-full bg-[#fafbd7] opacity-60 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="flex items-center justify-between max-w-[1600px] mx-auto">
          {/* Logo with Archive Label */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Logo />
            {isScrolled && (
              <div className="hidden md:flex items-center gap-2 opacity-0 animate-fadeIn">
                <div className="w-px h-4 bg-[#fafbd7] opacity-30" />
                <span className="text-[#fafbd7] opacity-40 text-[10px] tracking-[0.2em] font-mono">
                  ARCHIVE.2025
                </span>
              </div>
            )}
          </div>

          {/* Menu Button with Status Indicator */}
          <div className="flex items-center gap-3 sm:gap-4">
            {isScrolled && (
              <div className="hidden sm:flex items-center gap-2 opacity-0 animate-fadeIn">
                <div className="w-1.5 h-1.5 bg-[#fafbd7] opacity-60 animate-pulse" />
                <span className="text-[#fafbd7] opacity-40 text-[10px] tracking-[0.15em] font-mono">
                  AVAILABLE
                </span>
              </div>
            )}
            <MenuBtn isOpen={isMenuOpen} onClick={handleMenuClick} />
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-[#001b24] transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Decorative grid background */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(#fafbd7 1px, transparent 1px), linear-gradient(90deg, #fafbd7 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Archive Header in Menu */}
        <div className="absolute top-24 sm:top-28 left-8 right-8 flex items-center justify-between opacity-30 pointer-events-none">
          <div className="text-[#fafbd7] text-[10px] tracking-[0.3em] font-mono">
            <div>NAVIGATION</div>
            <div className="mt-1 text-[8px]">—————————</div>
          </div>
          <div className="text-[#fafbd7] text-[10px] tracking-[0.3em] font-mono text-right">
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
                  className={`transition-all duration-500 ${
                    isMenuOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <a
                    href={link.href}
                    className="group relative inline-flex items-center gap-6 sm:gap-8 px-4 py-2 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {/* Index Number */}
                    <span className="text-[#fafbd7] opacity-30 text-sm sm:text-base font-mono group-hover:opacity-60 transition-opacity duration-300">
                      {link.index}
                    </span>

                    {/* Link Name */}
                    <span className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#fafbd7] group-hover:translate-x-2 transition-transform duration-300">
                      {link.name}
                      <span className="absolute inset-x-0 -bottom-1 sm:-bottom-2 h-2 sm:h-3 bg-[#fafbd7] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    </span>

                    {/* Arrow Icon */}
                    <svg 
                      className="w-5 h-5 sm:w-6 sm:h-6 text-[#fafbd7] opacity-0 group-hover:opacity-60 -translate-x-4 group-hover:translate-x-0 transition-all duration-300"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>

            {/* Menu Footer Info */}
            <div className={`mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[#fafbd7] opacity-30 text-[10px] tracking-[0.2em] font-mono transition-all duration-700 delay-500 ${
              isMenuOpen ? "opacity-30 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <span>AVAILABLE FOR WORK</span>
              <span>•</span>
              <span>EST. 2025</span>
            </div>
          </div>
        </div>

        {/* Side Decorations */}
        <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="flex flex-col gap-3 text-[#fafbd7] opacity-20 text-[10px] tracking-[0.2em] font-mono -rotate-90 origin-left">
            <span>SCROLL TO NAVIGATE</span>
          </div>
        </div>

        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="w-1.5 h-1.5 border border-[#fafbd7] opacity-20 hover:opacity-60 hover:bg-[#fafbd7] transition-all duration-300"
              />
            ))}
          </div>
        </div>

        {/* Archive Footer */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-[#fafbd7] opacity-30 text-xs sm:text-sm tracking-[0.3em] font-light">
          — ARCHIVE —
        </div>

        {/* Corner Markers - Below Navbar/Menu Button */}
        <div className="absolute top-24 sm:top-28 left-8 w-8 h-8 border-t border-l border-[#fafbd7] opacity-10 pointer-events-none" />
        <div className="absolute top-24 sm:top-28 right-8 w-8 h-8 border-t border-r border-[#fafbd7] opacity-10 pointer-events-none" />
        <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-[#fafbd7] opacity-10" />
        <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-[#fafbd7] opacity-10" />
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;