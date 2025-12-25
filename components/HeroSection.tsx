"use client";
import React, { useState, useEffect } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);

  const roles = ["FRONTEND", "CREATIVE", "FULLSTACK"];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Role rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a1a1a] px-4 sm:px-6 lg:px-12 xl:px-16"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(#e8e6e0 1px, transparent 1px), linear-gradient(90deg, #e8e6e0 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%)",
          }}
        />
      </div>

      {/* Decorative Gradient Blurs - Simplified */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/[0.02] blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/[0.02] blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Corner Archive Labels */}
      <div className="absolute top-24 left-4 sm:left-6 lg:left-12 xl:left-16 text-[#e8e6e0] opacity-30 text-[9px] sm:text-[10px] tracking-[0.25em] font-mono">
        <div>ARCHIVE.2025</div>
      </div>
      <div className="absolute top-24 right-4 sm:right-6 lg:right-12 xl:right-16 text-[#e8e6e0] opacity-30 text-[9px] sm:text-[10px] tracking-[0.25em] font-mono text-right">
        <div>(2025)</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto pt-20">
        <div className="space-y-8 sm:space-y-12">
          
          {/* Top Label */}
          <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#e8e6e0] opacity-30" />
              <span className="text-[#e8e6e0]/60 text-xs tracking-[0.2em] font-mono">
                {roles[currentRole]} DEVELOPER
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <div className={`transition-all duration-1000 delay-200 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <h1 className="text-[13vw] sm:text-[10vw] lg:text-[8.5vw] font-black text-[#e8e6e0] leading-[0.85] tracking-[-0.04em] mix-blend-difference">
              <span className="block">BUILDING</span>
              <span className="block text-[#e8e6e0]/40">DIGITAL</span>
              <span className="block">EXPERIENCES</span>
            </h1>
          </div>

          {/* Bottom Section: Description & CTA */}
          <div className={`grid md:grid-cols-12 gap-8 items-end transition-all duration-1000 delay-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            
            {/* Description */}
             <div className="md:col-span-7 lg:col-span-6">
              <p className="text-[#e8e6e0]/60 text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-lg">
                Focusing on creating clean, interactive, and motion-driven web experiences that leave a lasting impression.
              </p>
            </div>

            {/* CTAs */}
            <div className="md:col-span-5 lg:col-span-6 flex flex-col sm:flex-row gap-4 md:justify-end">
              <a
                href="#projects"
                className="group relative px-8 py-4 bg-[#e8e6e0] text-[#1a1a1a] text-xs font-bold tracking-[0.2em] transition-transform hover:-translate-y-1"
              >
                <span className="relative z-10">SELECTED WORK</span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
              
              <a
                href="#contact"
                className="px-8 py-4 border border-[#e8e6e0]/20 text-[#e8e6e0] text-xs font-bold tracking-[0.2em] hover:bg-[#e8e6e0]/5 transition-colors"
              >
                GET IN TOUCH
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;