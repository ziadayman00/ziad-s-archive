"use client";
import React, { useState } from "react";
import projectsData from "@/projects.json";

// TypeScript interface for project data
interface Project {
  title: string;
  subtitle: string;
  year: string;
  sector: string;
  responsibility?: string;
  impact?: string;
  tech: string[];
  description: string;
  features?: string[];
  images: string[];
  live: string;
  github: string;
  comingSoon: boolean;
  inProgress: boolean;
}

interface ProjectsData {
  featuredProjects: Project[];
  webProjects: Project[];
}

const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const FEATURED_PROJECTS = (projectsData as ProjectsData).featuredProjects;
  const WEB_PROJECTS = (projectsData as ProjectsData).webProjects;

  const allProjects: Project[] =
    activeCategory === "all"
      ? [...FEATURED_PROJECTS, ...WEB_PROJECTS]
      : activeCategory === "featured"
      ? FEATURED_PROJECTS
      : WEB_PROJECTS;

  const getStatusLabel = (project: Project): string => {
    if (project.comingSoon) return "Coming Soon";
    if (project.inProgress) return "In Progress";
    return "Live";
  };

  const getStatusStyle = (project: Project): string => {
    if (project.comingSoon) {
      return "border border-cream border-opacity-40 text-cream opacity-60";
    }
    if (project.inProgress) {
      return "border-2 border-cream text-cream";
    }
    return "bg-cream text-background";
  };

  return (
    <section
      id="projects"
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
        {/* Archive Header */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-cream opacity-20" />
            <span className="text-cream text-xs tracking-[0.3em] opacity-40">
              ARCHIVE
            </span>
            <div className="h-px flex-1 bg-cream opacity-20" />
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-cream leading-[0.9] tracking-tight mb-8">
            SELECTED
            <br />
            <span className="inline-block mt-2 md:mt-4">WORKS</span>
          </h2>

          <p className="text-base md:text-lg text-cream opacity-60 max-w-2xl leading-relaxed">
            A curated collection of projects spanning full-stack applications,
            web experiences, and creative explorations.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 md:mb-16">
          {["all", "featured", "web"].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 text-sm font-bold tracking-wider transition-all duration-300 ${
                activeCategory === category
                  ? "bg-cream text-background"
                  : "border-2 border-cream text-cream hover:bg-cream hover:text-background"
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="space-y-0">
          {allProjects.map((project, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative border-t border-cream border-opacity-10 transition-all duration-500"
            >
              <div className="py-6 md:py-7 grid grid-cols-12 gap-4 md:gap-6 lg:gap-8 items-center">
                {/* Index Number */}
                <div className="col-span-2 md:col-span-1">
                  <span className="text-cream opacity-30 text-sm md:text-base font-mono group-hover:opacity-100 transition-opacity duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Project Info */}
                <div className="col-span-10 md:col-span-6 space-y-2">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-cream tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-base text-cream opacity-50">
                    {project.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 border border-cream border-opacity-20 text-cream opacity-60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Year & Sector */}
                <div className="col-span-6 md:col-span-2 space-y-1">
                  <p className="text-cream opacity-40 text-xs tracking-wider">
                    YEAR
                  </p>
                  <p className="text-cream text-lg md:text-xl font-bold">
                    {project.year}
                  </p>
                </div>

                <div className="col-span-6 md:col-span-2 space-y-1">
                  <p className="text-cream opacity-40 text-xs tracking-wider">
                    SECTOR
                  </p>
                  <p className="text-cream text-sm md:text-base opacity-80">
                    {project.sector}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="col-span-12 md:col-span-1 flex justify-start md:justify-end">
                  <span
                    className={`text-xs px-3 py-1 font-bold tracking-wider ${getStatusStyle(
                      project
                    )}`}
                  >
                    {getStatusLabel(project)}
                  </span>
                </div>
              </div>

              {/* Hover Expansion */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  hoveredProject === index
                    ? "max-h-[700px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pb-8 px-4 md:px-8 lg:px-12 border-t border-cream border-opacity-10">
                  <div className="pt-6 grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-6 lg:gap-8">
                    {/* Project Image */}
                    <div className="relative w-full h-[200px] md:h-[220px] lg:h-[240px] overflow-hidden border border-cream border-opacity-20 group/img">
                      <img
  src={project.images[0]}
  alt={project.title}
  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-105"
/>

                      <div className="absolute inset-0 bg-cream opacity-0 group-hover/img:opacity-5 transition-opacity duration-300" />
                    </div>

                    {/* Project Details */}
                    <div className="space-y-5">
                      {/* Description - Always show */}
                      <p className="text-cream opacity-70 text-sm md:text-base leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Stack - Show all tech */}
                      <div className="space-y-3">
                        <p className="text-cream opacity-50 text-xs tracking-wider font-bold uppercase">
                          Tech Stack
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, i) => (
                            <span
                              key={i}
                              className="text-xs px-3 py-1.5 border border-cream border-opacity-30 text-cream opacity-70"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Features - Only if available */}
                      {project.features && project.features.length > 0 && (
                        <div className="space-y-3">
                          <p className="text-cream opacity-50 text-xs tracking-wider font-bold uppercase">
                            Key Features
                          </p>
                          <ul className="space-y-2">
                            {project.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className="text-cream opacity-40 mt-0.5 text-sm">
                                  ▸
                                </span>
                                <span className="text-cream opacity-60 text-sm leading-relaxed">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Impact & Role - Only if available */}
                      {(project.impact || project.responsibility) && (
                        <div className="space-y-2 pt-2">
                          {project.impact && (
                            <div className="flex flex-wrap items-baseline gap-2">
                              <span className="text-cream opacity-50 text-xs tracking-wider font-bold uppercase">
                                Impact:
                              </span>
                              <span className="text-cream opacity-70 text-sm">
                                {project.impact}
                              </span>
                            </div>
                          )}
                          {project.responsibility && (
                            <div className="flex flex-wrap items-baseline gap-2">
                              <span className="text-cream opacity-50 text-xs tracking-wider font-bold uppercase">
                                Role:
                              </span>
                              <span className="text-cream opacity-70 text-sm">
                                {project.responsibility}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Project Links */}
                      <div className="flex flex-wrap gap-3 pt-2">
                        {project.live !== "#" && !project.comingSoon && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-cream text-background text-xs font-bold tracking-wider hover:opacity-90 transition-opacity duration-300"
                          >
                            <span>VIEW LIVE</span>
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        )}
                        {project.github !== "#" && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-cream text-cream text-xs font-bold tracking-wider hover:bg-cream hover:text-background transition-all duration-300"
                          >
                            <span>GITHUB</span>
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated Line on Hover */}
              <div
                className={`absolute left-0 bottom-0 h-px bg-cream transition-all duration-500 ${
                  hoveredProject === index ? "w-full opacity-30" : "w-0"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Archive Footer */}
        <div className="mt-20 flex items-center gap-4">
          <div className="h-px flex-1 bg-cream opacity-20" />
          <span className="text-cream text-xs tracking-[0.3em] opacity-40">
            END OF ARCHIVE
          </span>
          <div className="h-px flex-1 bg-cream opacity-20" />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection