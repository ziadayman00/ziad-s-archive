"use client";
import React, { useState } from "react";

interface Experience {
  company: string;
  role: string;
  period: string;
  achievements: string[];
  tech: string;
  status: string;
  type: string;
}

const EXPERIENCE: Experience[] = [
  {
    company: "AmbientLightFilms",
    role: "Frontend & Next.js Developer",
    period: "07/2025 - Present",
    achievements: [
      "Improved user engagement by 35%",
      "Reduced interaction steps by 50%",
      "Built system for 1000+ daily users",
    ],
    tech: "Next.js, Tailwind CSS, REST APIs",
    status: "ACTIVE",
    type: "DEVELOPMENT"
  },
  {
    company: "IEEE Damietta",
    role: "Graphic Designer",
    period: "2022 - Present",
    achievements: [
      "Designed visuals for team events",
      "Collaborated with design teams",
      "Delivered high-quality graphics",
    ],
    tech: "Figma, Photoshop",
    status: "ACTIVE",
    type: "DESIGN"
  },
];

const TECH_STACK = {
  "FRONTEND": ["React.js", "Next.js", "TypeScript", "JavaScript"],
  "STYLING": ["Tailwind CSS", "Bootstrap", "CSS3", "HTML5"],
  "BACKEND": ["Prisma", "PostgreSQL", "Supabase", "REST APIs"],
  "TOOLS": ["Git", "GitHub", "Figma", "Photoshop"],
};

const ExperienceSection: React.FC = () => {
  const [activeExp, setActiveExp] = useState<number | null>(null);
  const [activeTechCategory, setActiveTechCategory] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const allTechCount = Object.values(TECH_STACK).flat().length;

  return (
    <section
      id="experience"
      className="relative min-h-screen bg-background py-24 sm:py-32 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Archive Markers */}
      <div className="absolute top-8 sm:top-12 left-4 sm:left-6 lg:left-12 xl:left-16 text-foreground opacity-20 text-[10px] tracking-[0.3em] font-mono">
        <div>SEC.03</div>
        <div className="mt-1 text-[8px]">————</div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="mb-20 md:mb-28">
          <div className="flex items-center gap-3 sm:gap-4 mb-8">
            <div className="w-8 sm:w-12 h-[1px] bg-foreground opacity-30" />
            <span className="text-foreground text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] opacity-40 font-mono whitespace-nowrap">
              PROFESSIONAL JOURNEY
            </span>
          </div>

          <h2 className="text-[clamp(3rem,10vw,8rem)] font-black text-foreground leading-[0.9] tracking-[-0.01em] mb-6">
            EXPERIENCE
          </h2>

          <div className="flex items-center gap-3 sm:gap-4 max-w-xl">
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-foreground opacity-30" />
            <p className="text-foreground opacity-50 text-xs sm:text-sm font-light tracking-wide">
              Building digital products with precision and purpose
            </p>
          </div>
        </div>

        {/* Experience Timeline - Sleeker Cards */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-32 sm:mb-40">
          {EXPERIENCE.map((exp, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveExp(index)}
              onMouseLeave={() => setActiveExp(null)}
              className="group relative"
            >
              {/* Card Container - Thinner borders */}
              <div className="relative border border-foreground/10 hover:border-foreground/20 transition-all duration-500 bg-foreground/[0.01]">
                
                {/* Top Archive Bar - More compact */}
                <div className="border-b border-foreground/5 px-5 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-foreground/30 text-[9px] tracking-[0.15em] font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="w-px h-2.5 bg-foreground/20" />
                    <span className="text-foreground/40 text-[9px] tracking-[0.15em] font-mono">
                      {exp.type}
                    </span>
                  </div>
                  <div className={`px-2 py-0.5 ${
                    exp.status === "ACTIVE" 
                      ? "bg-foreground text-background" 
                      : "bg-foreground/10 text-foreground/50"
                  }`}>
                    <span className="text-[8px] tracking-[0.12em] font-mono">
                      {exp.status}
                    </span>
                  </div>
                </div>

                {/* Main Content - Tighter spacing */}
                <div className="p-6 sm:p-7 md:p-8">
                  
                  {/* Company & Role */}
                  <div className="mb-5">
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-2 leading-tight group-hover:text-foreground/80 transition-colors duration-300">
                      {exp.company}
                    </h3>
                    <p className="text-sm sm:text-base text-foreground/60 font-medium">
                      {exp.role}
                    </p>
                  </div>

                  {/* Period - Minimal style */}
                  <div className="mb-6 pb-5 border-b border-foreground/5">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-foreground/30 rounded-full" />
                      <span className="text-foreground/50 text-xs tracking-wide font-mono">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Achievements - Cleaner */}
                  <div className="space-y-3 mb-6">
                    <div className="text-foreground/30 text-[9px] tracking-[0.15em] font-mono mb-3">
                      KEY ACHIEVEMENTS
                    </div>
                    {exp.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start gap-3 group/item">
                        <div className="flex-shrink-0 mt-1.5">
                          <div className="w-1 h-1 bg-foreground/30 group-hover/item:bg-foreground transition-all duration-300 rounded-full" />
                        </div>
                        <span className="text-foreground/60 group-hover/item:text-foreground/80 text-sm leading-relaxed transition-colors duration-300">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack - Compact pills */}
                  <div className="pt-5 border-t border-foreground/5">
                    <div className="text-foreground/30 text-[9px] tracking-[0.15em] font-mono mb-3">
                      TECH STACK
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.split(", ").map((t, i) => (
                        <div 
                          key={i}
                          className="px-2.5 py-1 bg-foreground/5 hover:bg-foreground/10 transition-all duration-300"
                        >
                          <span className="text-foreground/50 text-[10px] font-mono tracking-wide">
                            {t}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover indicator - Left bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-[2px] bg-foreground transition-all duration-500 ${
                  activeExp === index ? "opacity-100" : "opacity-0"
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Section - Improved Grid */}
        <div>
          <div className="mb-20 md:mb-28">
            <div id="stack" className="flex items-center gap-3 sm:gap-4 mb-8">
              <div className="w-8 sm:w-12 h-[1px] bg-foreground opacity-30" />
              <span className="text-foreground text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] opacity-40 font-mono whitespace-nowrap">
                TECHNICAL ARSENAL
              </span>
            </div>

            <h2 className="text-[clamp(3rem,10vw,8rem)] font-black text-foreground leading-[0.9] tracking-[-0.01em] mb-6">
              TECH
              <br />
              <span className="inline-block mt-1 sm:mt-2 md:mt-3">STACK</span>
            </h2>

            <div className="flex items-center gap-3 sm:gap-4 max-w-xl mb-12">
              <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-foreground opacity-30" />
              <p className="text-foreground opacity-50 text-xs sm:text-sm font-light tracking-wide">
                {allTechCount} technologies organized by category
              </p>
            </div>
          </div>

          {/* Categorized Tech Grid - Enhanced */}
          <div className="space-y-10 sm:space-y-12">
            {Object.entries(TECH_STACK).map(([category, techs], catIndex) => (
              <div 
                key={category}
                onMouseEnter={() => setActiveTechCategory(category)}
                onMouseLeave={() => setActiveTechCategory(null)}
                className="group/category"
              >
                {/* Category Header - Sleeker */}
                <div className="mb-5 pb-3 border-b border-foreground/5">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-foreground/20 text-[9px] tracking-[0.15em] font-mono">
                        {String(catIndex + 1).padStart(2, "0")}
                      </span>
                      <div className="w-px h-3 bg-foreground/15" />
                      <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight group-hover/category:text-foreground/80 transition-colors duration-300">
                        {category}
                      </h3>
                    </div>
                    <span className="text-foreground/30 text-[10px] font-mono">
                      {techs.length}
                    </span>
                  </div>
                </div>

                {/* Tech Items Grid - More compact & elegant */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                  {techs.map((tech, techIndex) => (
                    <div
                      key={tech}
                      onMouseEnter={() => setHoveredTech(tech)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className={`group/tech relative border border-foreground/10 hover:border-foreground/30 p-4 transition-all duration-300 ${
                        hoveredTech === tech ? 'bg-foreground/5 scale-105' : 'bg-foreground/[0.01]'
                      }`}
                    >
                      {/* Tech Name */}
                      <div className="text-center">
                        <span className={`text-foreground text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 inline-block ${
                          hoveredTech === tech ? 'opacity-100 scale-110' : 'opacity-60'
                        }`}>
                          {tech}
                        </span>
                      </div>

                      {/* Archive Index - Bottom left */}
                      <div className={`absolute bottom-1.5 left-1.5 transition-opacity duration-300 ${
                        hoveredTech === tech ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <span className="text-foreground/20 text-[8px] font-mono">
                          {catIndex + 1}.{techIndex + 1}
                        </span>
                      </div>

                      {/* Active indicator - Top right */}
                      <div className={`absolute top-0 right-0 w-2 h-2 transition-opacity duration-300 ${
                        hoveredTech === tech ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <div className="w-full h-full bg-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tech Summary Footer - Cleaner */}
          <div className="mt-16 pt-6 border-t border-foreground/5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-foreground/30">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full" />
                <span className="text-[10px] tracking-[0.15em] font-mono">
                  TOTAL: {allTechCount} TECHNOLOGIES
                </span>
              </div>
              <span className="text-[9px] tracking-[0.15em] font-mono">
                LAST UPDATED: DEC 2025
              </span>
            </div>
          </div>
        </div>

        {/* Section Footer */}
        <div className="mt-32 sm:mt-40 flex items-center gap-3 sm:gap-4">
          <div className="h-[1px] flex-1 bg-foreground/10" />
          <span className="text-foreground text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] opacity-30 font-mono whitespace-nowrap">
            CONTINUOUSLY EVOLVING
          </span>
          <div className="h-[1px] flex-1 bg-foreground/10" />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;