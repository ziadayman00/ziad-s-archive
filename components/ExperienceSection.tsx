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
            backgroundImage: `linear-gradient(var(--color-cream) 1px, transparent 1px), linear-gradient(90deg, var(--color-cream) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>
      {/* Archive Markers */}
      <div className="absolute top-8 sm:top-12 left-4 sm:left-6 lg:left-12 xl:left-16 text-cream opacity-20 text-[10px] tracking-[0.3em] font-mono">
        <div>SEC.03</div>
        <div className="mt-1 text-[8px]">————</div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="mb-20 md:mb-28">
          <div className="flex items-center gap-3 sm:gap-4 mb-8">
            <div className="w-8 sm:w-12 h-[1px] bg-cream opacity-30" />
            <span className="text-cream text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] opacity-40 font-mono whitespace-nowrap">
              PROFESSIONAL JOURNEY
            </span>
          </div>

          <h2 className="text-[clamp(3rem,10vw,8rem)] font-black text-cream leading-[0.9] tracking-[-0.01em] mb-6">
            EXPERIENCE
          </h2>

          <div className="flex items-center gap-3 sm:gap-4 max-w-xl">
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-cream opacity-30" />
            <p className="text-cream opacity-50 text-xs sm:text-sm font-light tracking-wide">
              Building digital products with precision and purpose
            </p>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-32 sm:mb-40">
          {EXPERIENCE.map((exp, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveExp(index)}
              onMouseLeave={() => setActiveExp(null)}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative border border-cream border-opacity-15 hover:border-opacity-30 transition-all duration-500">
                {/* Top Archive Bar */}
                <div className="border-b border-cream border-opacity-10 px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-cream opacity-30 text-[10px] tracking-[0.2em] font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="w-px h-3 bg-cream opacity-20" />
                    <span className="text-cream opacity-40 text-[10px] tracking-[0.2em] font-mono">
                      {exp.type}
                    </span>
                  </div>
                  <div className={`px-2 py-1 border border-cream ${
                    exp.status === "ACTIVE" ? "border-opacity-40" : "border-opacity-20"
                  }`}>
                    <span className="text-cream opacity-60 text-[9px] tracking-[0.15em] font-mono">
                      {exp.status}
                    </span>
                  </div>
                </div>

                {/* Main Content */}
                <div className="p-6 sm:p-8 md:p-10">
                  {/* Company & Role */}
                  <div className="mb-6">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-cream tracking-tight mb-3 leading-tight">
                      {exp.company}
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl text-cream opacity-60 font-bold">
                      {exp.role}
                    </p>
                  </div>

                  {/* Period with Archive Style */}
                  <div className="mb-8 pb-6 border-b border-cream border-opacity-10">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-cream opacity-40" />
                      <span className="text-cream opacity-50 text-xs sm:text-sm tracking-wider font-mono">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Achievements - Improved Layout */}
                  <div className="space-y-4 mb-8">
                    <div className="text-cream opacity-40 text-[10px] tracking-[0.2em] font-mono mb-4">
                      KEY ACHIEVEMENTS
                    </div>
                    {exp.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start gap-4 group/item">
                        <div className="flex-shrink-0 mt-1.5">
                          <div className="w-1.5 h-1.5 border border-cream opacity-40 group-hover/item:opacity-100 group-hover/item:bg-cream transition-all duration-300" />
                        </div>
                        <span className="text-cream opacity-60 group-hover/item:opacity-80 text-sm sm:text-base leading-relaxed transition-opacity duration-300">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack - Archive Grid Style */}
                  <div className="pt-6 border-t border-cream border-opacity-10">
                    <div className="text-cream opacity-40 text-[10px] tracking-[0.2em] font-mono mb-4">
                      TECH STACK
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.split(", ").map((t, i) => (
                        <div 
                          key={i}
                          className="px-3 py-1.5 border border-cream border-opacity-20 hover:border-opacity-40 hover:bg-opacity-5 transition-all duration-300"
                        >
                          <span className="text-cream opacity-60 text-xs font-mono tracking-wide">
                            {t}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Corner Accents - Only on Hover */}
                <div className={`absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cream transition-all duration-500 pointer-events-none ${
                  activeExp === index ? "opacity-100" : "opacity-0"
                }`} />
                <div className={`absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-cream transition-all duration-500 pointer-events-none ${
                  activeExp === index ? "opacity-100" : "opacity-0"
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Section - Categorized Archive Style */}
        <div>
          <div className="mb-20 md:mb-28">
            <div id="stack" className="flex items-center gap-3 sm:gap-4 mb-8">
              <div className="w-8 sm:w-12 h-[1px] bg-cream opacity-30" />
              <span className="text-cream text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] opacity-40 font-mono whitespace-nowrap">
                TECHNICAL ARSENAL
              </span>
            </div>

            <h2 className="text-[clamp(3rem,10vw,8rem)] font-black text-cream leading-[0.9] tracking-[-0.01em] mb-6">
              TECH
              <br />
              <span className="inline-block mt-1 sm:mt-2 md:mt-3">STACK</span>
            </h2>

            <div className="flex items-center gap-3 sm:gap-4 max-w-xl mb-12">
              <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-cream opacity-30" />
              <p className="text-cream opacity-50 text-xs sm:text-sm font-light tracking-wide">
                {allTechCount} technologies organized by category
              </p>
            </div>
          </div>

          {/* Categorized Tech Grid */}
          <div className="space-y-8 sm:space-y-12">
            {Object.entries(TECH_STACK).map(([category, techs], catIndex) => (
              <div 
                key={category}
                onMouseEnter={() => setActiveTechCategory(category)}
                onMouseLeave={() => setActiveTechCategory(null)}
              >
                {/* Category Header */}
                <div className="mb-6 pb-4 border-b border-cream border-opacity-10">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-cream opacity-30 text-[10px] tracking-[0.2em] font-mono">
                        {String(catIndex + 1).padStart(2, "0")}
                      </span>
                      <div className="w-px h-4 bg-cream opacity-20" />
                      <h3 className="text-xl sm:text-2xl font-black text-cream tracking-tight">
                        {category}
                      </h3>
                    </div>
                    <span className="text-cream opacity-40 text-xs font-mono">
                      {techs.length} {techs.length === 1 ? "ITEM" : "ITEMS"}
                    </span>
                  </div>
                </div>

                {/* Tech Items Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {techs.map((tech, techIndex) => (
                    <div
                      key={tech}
                      className="group/tech relative border border-cream border-opacity-15 hover:border-opacity-40 p-4 sm:p-6 transition-all duration-300 hover:bg-opacity-[0.02]"
                    >
                      {/* Tech Name */}
                      <div className="text-center">
                        <span className="text-cream opacity-60 group-hover/tech:opacity-100 text-sm sm:text-base font-bold tracking-wide transition-all duration-300 inline-block">
                          {tech}
                        </span>
                      </div>

                      {/* Archive Index */}
                      <div className="absolute top-2 left-2 flex items-center gap-1.5 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300">
                        <span className="text-cream opacity-30 text-[9px] font-mono">
                          {catIndex + 1}.{techIndex + 1}
                        </span>
                      </div>

                      {/* Corner Marker */}
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cream opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tech Summary Footer */}
          <div className="mt-16 pt-8 border-t border-cream border-opacity-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 border border-cream opacity-40" />
                <span className="text-cream opacity-40 text-xs tracking-[0.2em] font-mono">
                  TOTAL: {allTechCount} TECHNOLOGIES
                </span>
              </div>
              <span className="text-cream opacity-30 text-[10px] tracking-[0.2em] font-mono">
                LAST UPDATED: NOV 2025
              </span>
            </div>
          </div>
        </div>

        {/* Section Footer */}
        <div className="mt-32 sm:mt-40 flex items-center gap-3 sm:gap-4">
          <div className="h-[1px] flex-1 bg-cream opacity-20" />
          <span className="text-cream text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] opacity-40 font-mono whitespace-nowrap">
            CONTINUOUSLY EVOLVING
          </span>
          <div className="h-[1px] flex-1 bg-cream opacity-20" />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;