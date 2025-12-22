// app/project/[id]/ScrollToTop.tsx
'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      if (scrolled > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      const totalScroll = docHeight - windowHeight;
      const progress = (scrolled / totalScroll) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 sm:right-8 z-50 group ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8 pointer-events-none'
      } transition-all duration-300`}
      aria-label="Scroll to top"
    >
      <div className="relative w-10 h-10">
        {/* Progress Circle */}
        <svg 
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 36 36"
        >
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-foreground opacity-10"
          />
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            className="text-foreground opacity-40 group-hover:opacity-60 transition-opacity duration-200"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            style={{ transition: 'stroke-dashoffset 0.1s linear, opacity 0.2s' }}
          />
        </svg>

        {/* Arrow Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-foreground opacity-50 group-hover:opacity-100 group-hover:-translate-y-px transition-all duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </div>

        {/* Hover Ring */}
        <div className="absolute inset-[-1px] border border-foreground opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
      </div>
    </button>
  );
}