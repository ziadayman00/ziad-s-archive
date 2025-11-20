'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// --- 1. Define Types for Data Structures ---
interface Phase {
  name: 'initializing' | 'loading' | 'compiling' | 'ready';
  text: string;
  progress: number;
}

interface LoadingItem {
  text: string;
  id: number;
}

// --- 2. Main Component ---
export default function PortfolioLoader() {
  // Use explicit types for useState
  const [progress, setProgress] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [currentPhase, setCurrentPhase] = useState<Phase['name']>('initializing');
  const [loadingItems, setLoadingItems] = useState<LoadingItem[]>([]);

  const phases: Phase[] = [
    { name: 'initializing', text: 'INITIALIZING', progress: 25 },
    { name: 'loading', text: 'LOADING ARCHIVE', progress: 50 },
    { name: 'compiling', text: 'COMPILING DATA', progress: 75 },
    { name: 'ready', text: 'READY', progress: 100 }
  ];

  const allLoadingItems: string[] = [
    'SYSTEM BOOT',
    'CONNECTING TO SERVER',
    'AUTHENTICATING USER',
    'LOADING ASSETS',
    'PARSING METADATA',
    'INITIALIZING COMPONENTS',
    'FETCHING PROJECT DATA',
    'LOADING IMAGES',
    'COMPILING STYLESHEETS',
    'OPTIMIZING PERFORMANCE',
    'MOUNTING INTERFACE',
    'ESTABLISHING CONNECTION',
    'VALIDATING CREDENTIALS',
    'SYNCHRONIZING DATA',
    'FINALIZING SETUP'
  ];

  // --- 3. useEffect for Progress (Faster: 30ms) ---
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 600);
          return 100;
        }
        return prev + 1;
      });
    }, 30); // Faster progress

    return () => clearInterval(interval);
  }, []);

  // --- 4. useEffect for Loading Items (Faster: 150ms) ---
  useEffect(() => {
    const itemInterval = setInterval(() => {
      setLoadingItems(prev => {
        const nextIndex = prev.length;
        if (nextIndex < allLoadingItems.length && progress < 95) {
          return [...prev, { text: allLoadingItems[nextIndex], id: nextIndex }];
        }
        if (progress >= 95) {
            clearInterval(itemInterval);
        }
        return prev;
      });
    }, 150); // Faster item logging

    return () => clearInterval(itemInterval);
  }, [progress]);

  // --- 5. useEffect for Phase Update ---
  useEffect(() => {
    if (progress < 25) setCurrentPhase('initializing');
    else if (progress < 50) setCurrentPhase('loading');
    else if (progress < 75) setCurrentPhase('compiling');
    else setCurrentPhase('ready');
  }, [progress]);

  // Type-safe lookup for current phase data
  const currentPhaseData = phases.find(p => p.name === currentPhase);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#001b24] transition-opacity duration-700 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Grid Background */}
      <div className="absolute inset-0" style={{ opacity: 0.03 }}>
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(#fafbd7 1px, transparent 1px), linear-gradient(90deg, #fafbd7 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* 🌟 SCATTERED BACKGROUND LOADING ITEMS (Subtle Terminal Messages) */}
      <div className="absolute inset-0 p-10 overflow-hidden pointer-events-none">
        <div className="font-mono text-[8px] sm:text-[10px] text-[#fafbd7] w-full h-full relative">
          {loadingItems.map((item, index) => (
            <div
              key={item.id}
              className="absolute transition-opacity duration-1000 ease-out"
              style={{
                top: `${(item.id % 5) * 15 + 10 + (Math.sin(item.id) * 5)}%`,
                left: `${(item.id % 4) * 20 + 5 + (Math.cos(item.id) * 5)}%`,
                opacity: 0.05 + (index * 0.005),
                transitionDelay: `${index * 0.1}s`,
                display: index > loadingItems.length - 10 ? 'block' : 'none',
              }}
            >
              <span className="text-green-400 mr-1 opacity-50">&gt;</span>
              <span>{item.text}</span>
              <span className="ml-1 text-green-400 opacity-50">✓</span>
            </div>
          ))}
          {progress < 100 && (
            <div className="absolute top-[80%] left-[5%] flex items-center gap-2 text-[#fafbd7] opacity-10">
              <span className="text-green-400">&gt;</span>
              <span className="animate-pulse">PROCESSING...</span>
              <span className="animate-blink">_</span>
            </div>
          )}
        </div>
      </div>
      {/* END OF SCATTERED BACKGROUND LOADING ITEMS */}


      {/* Corner Markers - More Prominent */}
      <div className="absolute top-6 sm:top-8 left-6 sm:left-8 w-16 h-16 border-t-2 border-l-2 border-[#fafbd7]" style={{ opacity: 0.15 }} />
      <div className="absolute top-6 sm:top-8 right-6 sm:right-8 w-16 h-16 border-t-2 border-r-2 border-[#fafbd7]" style={{ opacity: 0.15 }} />
      <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 w-16 h-16 border-b-2 border-l-2 border-[#fafbd7]" style={{ opacity: 0.15 }} />
      <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 w-16 h-16 border-b-2 border-r-2 border-[#fafbd7]" style={{ opacity: 0.15 }} />

      {/* Archive Labels */}
      <div className="absolute top-10 sm:top-12 right-10 sm:right-12 text-[#fafbd7] text-[10px] tracking-[0.3em] font-mono text-right" style={{ opacity: 0.25 }}>
        <div>V4.0</div>
        <div className="mt-1 text-[8px]">————</div>
      </div>

      {/* Main Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4">
        {/* Logo - Made Smaller */}
        <div className="mb-8 sm:mb-12">
          <div className="w-36 sm:w-48 md:w-60 lg:w-72">
            <Image
              src="/logo.svg"
              alt="Ziad Ayman"
              width={384}
              height={96}
              className="w-full h-auto"
              style={{ opacity: 0.9 }}
              priority
            />
          </div>
        </div>

        {/* Loading Section */}
        <div className="w-full max-w-xl space-y-6 sm:space-y-8">
          {/* Status Text */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <div className="w-1.5 h-1.5 bg-[#fafbd7] animate-pulse" style={{ opacity: 0.6 }} />
              <p className="text-[#fafbd7] text-xs sm:text-sm tracking-[0.2em] font-mono" style={{ opacity: 0.5 }}>
                {/* Use optional chaining because currentPhaseData might be undefined initially */}
                {currentPhaseData?.text}
              </p>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="relative px-2">
            {/* Main Progress Bar Background */}
            <div className="relative h-1 border border-[#fafbd7]" style={{ backgroundColor: 'rgba(250, 251, 215, 0.1)' }}>
              {/* Progress Fill */}
              <div
                className="absolute top-0 left-0 h-full transition-all duration-200 ease-linear"
                style={{
                  width: `${progress}%`,
                  backgroundColor: '#fafbd7',
                  opacity: 0.7
                }}
              />
              {/* Animated Scanner Line */}
              <div
                className="absolute top-0 h-full w-[2px] transition-all duration-200 ease-linear"
                style={{
                  left: `${progress}%`,
                  backgroundColor: '#fafbd7',
                  opacity: 1,
                  boxShadow: '0 0 8px #fafbd7, 0 0 12px #fafbd7',
                  transform: 'translateX(-1px)'
                }}
              />
            </div>

            {/* Progress Percentage */}
            <div className="flex items-center justify-between mt-3 text-[#fafbd7]">
              <span className="text-[10px] font-mono" style={{ opacity: 0.3 }}>
                00:00
              </span>
              <span className="text-base sm:text-lg font-mono font-bold" style={{ opacity: 0.7 }}>
                {progress}%
              </span>
              <span className="text-[10px] font-mono" style={{ opacity: 0.3 }}>
                00:{Math.floor(progress * 0.03).toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Phase Indicators - Cleaner */}
          <div className="flex items-center justify-center gap-3 pt-2">
            {phases.map((phase, index) => (
              <div
                key={phase.name}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`w-2 h-2 transition-all duration-300 ${
                    progress >= phase.progress
                      ? 'bg-[#fafbd7]'
                      : 'border border-[#fafbd7]'
                  }`}
                  style={{ opacity: progress >= phase.progress ? 0.7 : 0.2 }}
                />
                <span
                  className="text-[#fafbd7] text-[9px] tracking-[0.15em] font-mono"
                  style={{ opacity: progress >= phase.progress ? 0.4 : 0.2 }}
                >
                  0{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-8 sm:bottom-12 text-center">
          <p className="text-[#fafbd7] text-[9px] sm:text-[10px] tracking-[0.25em] font-mono" style={{ opacity: 0.25 }}>
            PORTFOLIO 2025 • REACT • NEXT.JS
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
}