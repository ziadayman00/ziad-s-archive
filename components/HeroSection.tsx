"use client";
import React, { useState, useEffect, useRef } from "react";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [scanlinePosition, setScanlinePosition] = useState(0);
  const heroRef = useRef(null);

  const roles = ["FRONTEND", "CREATIVE", "FULLSTACK"];

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: any) => {
      // Throttle mouse movement for performance
      requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 15,
          y: (e.clientY / window.innerHeight - 0.5) * 15,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Role rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Scanline animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScanlinePosition((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center mt-6 justify-center overflow-hidden bg-[#001b24] px-4 sm:px-6 lg:px-12 xl:px-16"
    >
      {/* Animated Scanline Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: `linear-gradient(180deg, transparent ${scanlinePosition}%, #fafbd7 ${scanlinePosition + 0.1}%, transparent ${scanlinePosition + 0.2}%)`,
        }}
      />

      {/* Subtle Grid Background with Fade */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(#fafbd7 1px, transparent 1px), linear-gradient(90deg, #fafbd7 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%)",
          }}
        />
      </div>

      {/* Corner Archive Labels - Below Navbar */}
      <div className="absolute top-28 sm:top-32 left-4 sm:left-6 lg:left-12 xl:left-16 text-[#fafbd7] opacity-30 text-[10px] sm:text-xs tracking-[0.3em] font-mono">
        <div>ARCHIVE.2025</div>
        <div className="mt-1 text-[8px] sm:text-[10px]">—————————</div>
      </div>
      <div className="absolute top-28 sm:top-32 right-4 sm:right-6 lg:right-12 xl:right-16 text-[#fafbd7] opacity-30 text-[10px] sm:text-xs tracking-[0.3em] font-mono text-right">
        <div>PORTFOLIO.V4</div>
        <div className="mt-1 text-[8px] sm:text-[10px]">—————————</div>
      </div>

      {/* Floating Orbs with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[20%] left-[15%] w-48 sm:w-64 h-48 sm:h-64 bg-[#fafbd7] rounded-full opacity-[0.03] blur-3xl transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)`,
          }}
        />
        <div
          className="absolute bottom-[20%] right-[15%] w-64 sm:w-96 h-64 sm:h-96 bg-[#fafbd7] rounded-full opacity-[0.03] blur-3xl transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${-mousePosition.x * 1.2}px, ${-mousePosition.y * 1.2}px)`,
          }}
        />
        <div
          className="absolute top-[50%] left-[50%] w-32 sm:w-48 h-32 sm:h-48 bg-[#fafbd7] rounded-full opacity-[0.02] blur-2xl transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px)`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1600px] py-20 sm:py-24">
        <div className="space-y-6 sm:space-y-8 md:space-y-12">
          {/* Archive Label Above Title */}
         <div
  className={`transition-all duration-1000 delay-100 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  } mt-16 sm:mt-0`}
>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
              <div className="w-6 sm:w-8 md:w-12 h-[1px] bg-[#fafbd7] opacity-40" />
              <span className="text-[#fafbd7] opacity-50 text-[9px] sm:text-[10px] md:text-xs tracking-[0.25em] sm:tracking-[0.3em] font-mono whitespace-nowrap">
                {roles[currentRole]} DEVELOPER
              </span>
            </div>
          </div>

          {/* Main Heading - Optimized for Mobile */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-[clamp(2.5rem,11vw,9rem)] font-black text-[#fafbd7] leading-[0.9] tracking-[-0.02em]">
              <span className="inline-block relative">
                BUILDING
                <span className="absolute -right-1 sm:-right-2 top-0 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#fafbd7] opacity-60" />
              </span>
              <br />
              <span className="inline-block mt-1 sm:mt-2 md:mt-3 relative">
                CREATIVE
                <span className="absolute left-0 -bottom-0.5 sm:-bottom-1 w-full h-[1px] sm:h-[2px] bg-gradient-to-r from-[#fafbd7] to-transparent opacity-20" />
              </span>
              <br />
              <span className="inline-block mt-1 sm:mt-2 md:mt-3 bg-gradient-to-r from-[#fafbd7] via-[#fafbd7] to-[#001b24] text-transparent bg-clip-text animate-gradient">
                EXPERIENCES
              </span>
            </h1>
          </div>

          {/* Divider Line */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-3 sm:gap-4 max-w-2xl">
              <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent to-[#fafbd7] opacity-40" />
              <span className="text-[#fafbd7] opacity-40 text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] font-mono whitespace-nowrap">
                EST. 2025
              </span>
            </div>
          </div>

          {/* Description */}
          <div
            className={`max-w-xl lg:max-w-2xl transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-sm sm:text-base md:text-lg text-[#fafbd7] opacity-70 leading-relaxed font-light">
              Motion-driven interfaces with sharp intent — I turn product goals
              into bite-sized, irresistible interactions.
              <br className="hidden sm:block" />
              Clean code, deliberate motion, noticeable results.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 md:gap-6 transition-all duration-1000 delay-900 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href="#projects"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-[#fafbd7] text-[#001b24] font-bold text-xs sm:text-sm md:text-base tracking-[0.2em] overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-center"
            >
              <span className="relative z-10">VIEW PROJECTS</span>
              <div className="absolute inset-0 bg-[#001b24] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <span className="absolute inset-0 flex items-center justify-center text-[#fafbd7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                VIEW PROJECTS
              </span>
            </a>

            <a
              href="#contact"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#fafbd7] text-[#fafbd7] font-bold text-xs sm:text-sm md:text-base tracking-[0.2em] transition-all duration-300 hover:bg-[#fafbd7] hover:text-[#001b24] hover:scale-105 active:scale-95 text-center overflow-hidden"
            >
              <span className="relative z-10">GET IN TOUCH</span>
              <div className="absolute inset-0 border-2 border-[#fafbd7] transform scale-0 group-hover:scale-100 transition-transform duration-300" />
            </a>
          </div>

          {/* Bottom Archive Metadata */}
          <div
            className={`pt-6 sm:pt-8 md:pt-12 flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-[#fafbd7] opacity-30 text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] font-mono transition-all duration-1000 delay-1100 ${
              isVisible ? "opacity-30 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span>SCROLL TO EXPLORE</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">AVAILABLE FOR WORK</span>
          </div>
        </div>
      </div>


      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;