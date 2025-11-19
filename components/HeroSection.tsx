"use client";
import React, { useState, useEffect } from "react";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: any) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const roles = ["FRONTEND", "CREATIVE", "FULLSTACK"];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#001b24] px-4 sm:px-6 lg:px-12 xl:px-16">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(#fafbd7 1px, transparent 1px), linear-gradient(90deg, #fafbd7 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#fafbd7] rounded-full opacity-[0.02] blur-3xl"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#fafbd7] rounded-full opacity-[0.02] blur-3xl"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1600px] py-20">
        <div className="space-y-8 md:space-y-12">
          {/* Main Heading - HUGE & BOLD */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* *** FIX 1: Mobile Font Size and Spacing Adjusted ***
                - text-5xl: New smaller size for mobile (was text-6xl)
                - sm:text-7xl md:text-8xl lg:text-9xl: Desktop sizes retained
                - leading-[0.9]: Retained tight leading
            */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-color-cream leading-[0.9] tracking-tight">
              BUILDING
              <br />
              <span className="inline-block mt-1 sm:mt-2 md:mt-4">CREATIVE</span>
              <br />
              {/* *** FIX 2: Added a specific mobile line break for "EXPERIENCES" to prevent cropping and control word separation on very small screens. ***
                - mt-1: Reduced top margin for better vertical spacing on mobile (was mt-2)
              */}
              <span className="inline-block mt-1 sm:mt-2 md:mt-4 bg-gradient-to-r from-[#fafbd7] to-[#fafbd7] bg-opacity-50 text-transparent bg-clip-text">
                EXPERIENCES
              </span>
            </h1>
          </div>

          {/* Description */}
          <div
            className={`max-w-2xl transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-base md:text-lg text-[#fafbd7] opacity-60 leading-relaxed">
              Motion-driven interfaces with sharp intent — I turn product goals
              into bite-sized, irresistible interactions.
              <br className="hidden md:block" />
              Clean code, deliberate motion, noticeable results.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap items-center gap-4 md:gap-6 transition-all duration-1000 delay-900 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-[#fafbd7] text-[#001b24] font-bold text-sm md:text-base tracking-wider overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">VIEW PROJECTS</span>
              <div className="absolute inset-0 bg-[#001b24] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <span className="absolute inset-0 flex items-center justify-center text-[#fafbd7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                VIEW PROJECTS
              </span>
            </a>

            <a
              href="#contact"
              className="group px-8 py-4 border-2 border-[#fafbd7] text-[#fafbd7] font-bold text-sm md:text-base tracking-wider transition-all duration-300 hover:bg-[#fafbd7] hover:text-[#001b24] hover:scale-105 active:scale-95"
            >
              GET IN TOUCH
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;