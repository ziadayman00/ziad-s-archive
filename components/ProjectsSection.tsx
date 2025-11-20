"use client";
import React, { useState, useEffect } from "react";
import projectsData from "@/projects.json";

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
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const FEATURED_PROJECTS = (projectsData as ProjectsData).featuredProjects;
  const WEB_PROJECTS = (projectsData as ProjectsData).webProjects;

  const allProjects: Project[] =
    activeCategory === "all"
      ? [...FEATURED_PROJECTS, ...WEB_PROJECTS]
      : activeCategory === "featured"
      ? FEATURED_PROJECTS
      : WEB_PROJECTS;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleProjectClick = (index: number) => {
    if (isMobile) {
      setExpandedProjects(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!isMobile) {
      setHoveredProject(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoveredProject(null);
    }
  };

  const isExpanded = (index: number) => {
    return isMobile ? expandedProjects.includes(index) : hoveredProject === index;
  };

  const getStatusLabel = (project: Project): string => {
    if (project.comingSoon) return "COMING SOON";
    if (project.inProgress) return "IN PROGRESS";
    return "LIVE";
  };

  const getStatusStyle = (project: Project): string => {
    if (project.comingSoon) {
      return "border border-cream border-opacity-30 text-cream opacity-50";
    }
    if (project.inProgress) {
      return "border border-cream border-opacity-50 text-cream opacity-70";
    }
    return "bg-cream text-background";
  };

  const getCategoryLabel = (category: string): string => {
    const labels: Record<string, string> = {
      all: "ALL PROJECTS",
      featured: "FEATURED",
      web: "WEB APPS"
    };
    return labels[category] || category.toUpperCase();
  };

  const getProjectType = (index: number): string => {
    return index < FEATURED_PROJECTS.length ? "FEATURED" : "WEB";
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen bg-background py-20 sm:py-28 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgb(245, 245, 220) 1px, transparent 1px), linear-gradient(90deg, rgb(245, 245, 220) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Archive Markers */}
      <div className="absolute top-28 sm:top-32 left-4 sm:left-6 lg:left-12 xl:left-16 text-cream opacity-20 text-[10px] tracking-[0.3em] font-mono">
        <div>SEC.02</div>
        <div className="mt-1 text-[8px]">————</div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto">
        {/* Archive Header */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 sm:gap-4 mb-8">
            <div className="w-8 sm:w-12 h-[1px] bg-cream opacity-30" />
            <span className="text-cream text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] opacity-40 font-mono whitespace-nowrap">
              PROJECT ARCHIVE
            </span>
          </div>

          <h2 className="text-[clamp(3rem,10vw,8rem)] font-black text-cream leading-[0.9] tracking-[-0.01em] mb-6">
            SELECTED
            <br />
            <span className="inline-block mt-1 sm:mt-2 md:mt-3">WORKS</span>
          </h2>

          <div className="flex items-center gap-3 sm:gap-4 max-w-2xl mb-8">
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-cream opacity-30" />
            <p className="text-cream opacity-50 text-xs sm:text-sm font-light tracking-wide">
              A curated collection of projects spanning full-stack applications and creative explorations
            </p>
          </div>

          {/* Archive Stats */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-cream opacity-40 text-[10px] tracking-[0.2em] font-mono">
            <span>TOTAL: {allProjects.length} PROJECTS</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">CATEGORY: {getCategoryLabel(activeCategory)}</span>
          </div>
        </div>

        {/* Filter Tabs - Archive Style */}
        <div className="mb-12 md:mb-16">
          <div className="text-cream opacity-40 text-[10px] tracking-[0.2em] font-mono mb-4">
            FILTER BY CLASSIFICATION
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {["all", "featured", "web"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-5 sm:px-6 py-2.5 sm:py-3 text-xs font-bold tracking-[0.15em] transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-cream text-background"
                    : "border border-cream border-opacity-30 text-cream hover:border-opacity-50"
                }`}
              >
                <span className="relative z-10">{getCategoryLabel(category)}</span>
                {activeCategory === category && (
                  <>
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-background opacity-50" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-background opacity-50" />
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Archive List */}
        <div className="space-y-0 border-t border-cream border-opacity-10">
          {allProjects.map((project, index) => (
            <div
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleProjectClick(index)}
              className={`group relative border-b border-cream border-opacity-10 transition-all duration-500 ${
                isMobile ? 'cursor-pointer' : 'md:cursor-default'
              } ${isExpanded(index) ? ' bg-opacity-[0.02]' : ''}`}
            >
              {/* Main Row */}
              <div className="py-5 sm:py-6 md:py-7 grid grid-cols-12 gap-3 sm:gap-4 md:gap-6 items-start md:items-center">
                {/* Archive Index */}
                <div className="col-span-2 sm:col-span-2 md:col-span-1 flex flex-col gap-1">
                  <span className="text-cream opacity-30 group-hover:opacity-100 text-sm sm:text-base font-mono transition-opacity duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="hidden md:block w-full h-[1px] bg-cream opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </div>

                {/* Project Title & Info */}
                <div className="col-span-10 sm:col-span-10 md:col-span-5 space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-cream opacity-30 text-[9px] tracking-[0.15em] font-mono">
                      {getProjectType(index)}
                    </span>
                    <div className="w-px h-2 bg-cream opacity-20" />
                    <span className="text-cream opacity-30 text-[9px] tracking-[0.15em] font-mono">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-cream tracking-tight leading-tight group-hover:translate-x-2 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cream opacity-50 leading-relaxed">
                    {project.subtitle}
                  </p>
                  
                  {/* Tech Pills - Mobile */}
                  <div className="flex flex-wrap gap-1.5 pt-2 md:hidden">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[9px] px-2 py-1 border border-cream border-opacity-20 text-cream opacity-60 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-[9px] px-2 py-1 text-cream opacity-40 font-mono">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Tech Stack - Desktop */}
                <div className="hidden md:block col-span-3 space-y-1.5">
                  <p className="text-cream opacity-30 text-[10px] tracking-[0.15em] font-mono">
                    TECH STACK
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-1 border border-cream border-opacity-20 text-cream opacity-60 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-[10px] px-2 py-1 text-cream opacity-40 font-mono">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Sector */}
                <div className="col-span-6 sm:col-span-5 md:col-span-2 space-y-1">
                  <p className="text-cream opacity-30 text-[10px] tracking-[0.15em] font-mono">
                    SECTOR
                  </p>
                  <p className="text-cream text-xs sm:text-sm opacity-70 font-medium">
                    {project.sector}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="col-span-6 sm:col-span-5 md:col-span-1 flex justify-end">
                  <span
                    className={`text-[9px] sm:text-[10px] px-2 sm:px-3 py-1 sm:py-1.5 font-bold tracking-[0.1em] whitespace-nowrap ${getStatusStyle(project)}`}
                  >
                    {getStatusLabel(project)}
                  </span>
                </div>
              </div>

              {/* Expansion Panel */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded(index)
                    ? "max-h-[2000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pb-8 px-2 sm:px-4 md:px-8 border-t border-cream border-opacity-10">
                  {/* Archive Document Header */}
                  <div className="pt-6 pb-4 flex items-center justify-between border-b border-cream border-opacity-10 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-cream opacity-30 text-[10px] tracking-[0.2em] font-mono">
                        DOCUMENT ID: PRJ-{String(index + 1).padStart(3, "0")}
                      </span>
                    </div>
                    <span className="text-cream opacity-30 text-[10px] tracking-[0.2em] font-mono">
                      ARCHIVED: {project.year}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:gap-8">
                    {/* Project Image */}
                    <div className="relative w-full h-[200px] sm:h-[240px] lg:h-[280px] overflow-hidden border border-cream border-opacity-20 group/img">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-cream opacity-0 group-hover/img:opacity-5 transition-opacity duration-300" />
                      
                      {/* Image Corner Markers */}
                      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-cream opacity-30" />
                      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-cream opacity-30" />
                      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-cream opacity-30" />
                      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-cream opacity-30" />
                    </div>

                    {/* Project Details */}
                    <div className="space-y-5 sm:space-y-6">
                      {/* Description */}
                      <div>
                        <div className="text-cream opacity-40 text-[10px] tracking-[0.2em] font-mono mb-3">
                          PROJECT OVERVIEW
                        </div>
                        <p className="text-cream opacity-70 text-sm sm:text-base leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Complete Tech Stack */}
                      <div>
                        <div className="text-cream opacity-40 text-[10px] tracking-[0.2em] font-mono mb-3">
                          COMPLETE TECH STACK
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, i) => (
                            <span
                              key={i}
                              className="text-[10px] sm:text-xs px-3 py-1.5 border border-cream border-opacity-30 text-cream opacity-70 font-mono hover:border-opacity-50 hover:opacity-90 transition-all duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Features */}
                      {project.features && project.features.length > 0 && (
                        <div>
                          <div className="text-cream opacity-40 text-[10px] tracking-[0.2em] font-mono mb-3">
                            KEY FEATURES
                          </div>
                          <ul className="space-y-2">
                            {project.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className="text-cream opacity-30 mt-1 text-xs">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="text-cream opacity-60 text-xs sm:text-sm leading-relaxed">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Impact & Role Grid */}
                      {(project.impact || project.responsibility) && (
                        <div className="grid sm:grid-cols-2 gap-4 pt-2">
                          {project.impact && (
                            <div className="border border-cream border-opacity-10 p-4">
                              <div className="text-cream opacity-40 text-[10px] tracking-[0.2em] font-mono mb-2">
                                IMPACT
                              </div>
                              <p className="text-cream opacity-70 text-xs sm:text-sm">
                                {project.impact}
                              </p>
                            </div>
                          )}
                          {project.responsibility && (
                            <div className="border border-cream border-opacity-10 p-4">
                              <div className="text-cream opacity-40 text-[10px] tracking-[0.2em] font-mono mb-2">
                                ROLE
                              </div>
                              <p className="text-cream opacity-70 text-xs sm:text-sm">
                                {project.responsibility}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Project Links */}
                      <div className="flex flex-wrap gap-3 pt-4 border-t border-cream border-opacity-10">
                        {project.live !== "#" && !project.comingSoon && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-cream text-background text-xs font-bold tracking-[0.15em] hover:opacity-90 transition-opacity duration-300"
                          >
                            <span>VIEW LIVE</span>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                        {project.github !== "#" && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 px-5 py-2.5 border border-cream text-cream text-xs font-bold tracking-[0.15em] hover:text-background transition-all duration-300"
                          >
                            <span>GITHUB</span>
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expansion Indicator Line */}
              <div
                className={`absolute left-0 bottom-0 h-[2px] bg-cream transition-all duration-500 ${
                  isExpanded(index) ? "w-full opacity-20" : "w-0 opacity-0"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Archive Footer */}
        <div className="mt-20 sm:mt-24 space-y-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="h-[1px] flex-1 bg-cream opacity-20" />
            <span className="text-cream text-[10px] tracking-[0.2em] sm:tracking-[0.3em] opacity-40 font-mono">
              END OF ARCHIVE
            </span>
            <div className="h-[1px] flex-1 bg-cream opacity-20" />
          </div>
          
          <div className="text-center text-cream opacity-30 text-[10px] tracking-[0.2em] font-mono">
            {allProjects.length} PROJECTS ARCHIVED
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;