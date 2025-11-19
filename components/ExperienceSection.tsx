"use client";
import React, { useState } from "react";

interface Experience {
  company: string;
  role: string;
  period: string;
  achievements: string[];
  tech: string;
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
  },
];

const TECH_STACK: string[] = [
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Bootstrap",
  "HTML5",
  "CSS3",
  "Git",
  "GitHub",
  "Figma",
  "Photoshop",
  "Prisma",
  "PostgreSQL",
  "Supabase",
  "REST APIs",
];

const ExperienceSection: React.FC = () => {
  const [activeExp, setActiveExp] = useState<number | null>(null);

  return (
    <section
      id="experience"
      className="relative min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden"
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

      <div className="relative z-10 max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-cream opacity-20" />
            <span className="text-cream text-xs tracking-[0.3em] opacity-40">
              PROFESSIONAL JOURNEY
            </span>
            <div className="h-px flex-1 bg-cream opacity-20" />
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-cream leading-[0.9] tracking-tight">
            EXPERIENCE
          </h2>
        </div>

        {/* Experience Timeline */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-32">
          {EXPERIENCE.map((exp, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveExp(index)}
              onMouseLeave={() => setActiveExp(null)}
              className="group relative"
            >
              {/* Card Container */}
              <div
                className={`relative border-2 border-cream border-opacity-20 p-8 md:p-10 transition-all duration-500 ${
                  activeExp === index
                    ? "border-opacity-60"
                    : "hover:border-opacity-40"
                }`}
              >
                {/* Corner Accent */}
                <div
                  className={`absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-cream transition-all duration-500 ${
                    activeExp === index ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div
                  className={`absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-cream transition-all duration-500 ${
                    activeExp === index ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Number Badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-cream text-background flex items-center justify-center font-black text-xl">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="space-y-6">
                  {/* Company & Role */}
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black text-cream tracking-tight mb-2 group-hover:translate-x-2 transition-transform duration-300">
                      {exp.company}
                    </h3>
                    <p className="text-lg md:text-xl text-cream opacity-70 font-bold">
                      {exp.role}
                    </p>
                  </div>

                  {/* Period */}
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-cream opacity-20" />
                    <span className="text-cream opacity-50 text-sm tracking-wider font-mono">
                      {exp.period}
                    </span>
                    <div className="h-px flex-1 bg-cream opacity-20" />
                  </div>

                  {/* Achievements */}
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-cream opacity-40 mt-1 text-lg">
                          ◆
                        </span>
                        <span className="text-cream opacity-70 text-sm md:text-base leading-relaxed">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Used */}
                  <div className="pt-4">
                    <p className="text-cream opacity-40 text-xs tracking-wider font-bold mb-3 uppercase">
                      Technologies
                    </p>
                    <p className="text-cream opacity-60 text-sm font-mono">
                      {exp.tech}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Section */}
        <div>
          <div id="stack" className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-cream opacity-20" />
            <span className="text-cream text-xs tracking-[0.3em] opacity-40">
              TECHNICAL ARSENAL
            </span>
            <div className="h-px flex-1 bg-cream opacity-20" />
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-cream leading-[0.9] tracking-tight mb-16">
            TECH
            <br />
            <span className="inline-block mt-2 md:mt-4">STACK</span>
          </h2>

          {/* Tech Grid - Archive Style */}
          <div className="relative">
            {/* Grid Container */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-0 border-l border-t border-cream border-opacity-10">
              {TECH_STACK.map((tech, index) => (
                <div
                  key={index}
                  className="group relative border-r border-b border-cream border-opacity-10 p-6 md:p-8 flex items-center justify-center aspect-square transition-all duration-300"
                >
                  {/* Tech Name */}
                  <div className="text-center">
                    <span className="text-cream opacity-60 text-sm md:text-base font-bold tracking-wider group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 inline-block">
                      {tech}
                    </span>
                  </div>

                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 bg-cream opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none" />

                  {/* Index Number - Shows on Hover */}
                  <span className="absolute top-2 left-2 text-cream opacity-0 group-hover:opacity-30 text-xs font-mono transition-opacity duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Corner Accent on Hover */}
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>

            {/* Tech Count */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-px w-20 bg-cream opacity-20" />
              <span className="text-cream opacity-40 text-xs tracking-[0.3em] font-mono">
                {TECH_STACK.length} TECHNOLOGIES
              </span>
              <div className="h-px w-20 bg-cream opacity-20" />
            </div>
          </div>
        </div>

        {/* Section Footer */}
        <div className="mt-32 flex items-center gap-4">
          <div className="h-px flex-1 bg-cream opacity-20" />
          <span className="text-cream text-xs tracking-[0.3em] opacity-40">
            CONTINUOUSLY EVOLVING
          </span>
          <div className="h-px flex-1 bg-cream opacity-20" />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;