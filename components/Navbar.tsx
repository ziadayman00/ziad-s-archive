"use client";
import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import MenuBtn from "./MenuBtn";

// Menu Button Component

// Main Navbar Component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    {name: "Stack", href: "#stack"},
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-12 xl:px-16 ${
          isScrolled
            ? "bg-[#001b24] bg-opacity-95 backdrop-blur-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="flex items-center justify-between max-w-[1600px] mx-auto">
          <Logo />
          <MenuBtn isOpen={isMenuOpen} onClick={handleMenuClick} />
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
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(#fafbd7 1px, transparent 1px), linear-gradient(90deg, #fafbd7 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Menu Content */}
        <div className="relative h-full flex items-center justify-center">
          <ul className="space-y-8 text-center">
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
                  className="group relative inline-block text-4xl md:text-6xl font-bold text-[#fafbd7] hover:text-[#fafbd7] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute inset-x-0 -bottom-2 h-3 bg-[#fafbd7] opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-0" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Archive decoration */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-color-cream opacity-30 text-sm tracking-widest">
          — ARCHIVE —
        </div>
      </div>
    </>
  );
};

export default Navbar;
