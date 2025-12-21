"use client";
import React, { useState, useEffect } from "react";
import projectsData from "@/projects.json";
import Link from "next/link";

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

  const getStatusLabel = (project: Project): string => {
    if (project.comingSoon) return "COMING SOON";
    if (project.inProgress) return "IN PROGRESS";
    return "LIVE";
  };

  const getStatusStyle = (project: Project): string => {
    if (project.comingSoon) {
      return "border border-foreground border-opacity-30 text-foreground opacity-50";
    }
    if (project.inProgress) {
      return "border border-foreground border-opacity-50 text-foreground opacity-70";
    }
    return "bg-foreground text-background";
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
      <div className="absolute top-8 sm:top-12 left-4 sm:left-6 lg:left-12 xl:left-16 text-foreground opacity-20 text-[10px] tracking-[0.3em] font-mono">
        <div>SEC.02</div>
        <div className="mt-1 text-[8px]">————</div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto">
        {/* Archive Header */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 sm:gap-4 mb-8">
            <div className="w-8 sm:w-12 h-[1px] bg-foreground opacity-30" />
            <span className="text-foreground text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] opacity-40 font-mono whitespace-nowrap">
              PROJECT ARCHIVE
            </span>
          </div>

          <h2 className="text-[clamp(3rem,10vw,8rem)] font-black text-foreground leading-[0.9] tracking-[-0.01em] mb-6">
            SELECTED
            <br />
            <span className="inline-block mt-1 sm:mt-2 md:mt-3">WORKS</span>
          </h2>

          <div className="flex items-center gap-3 sm:gap-4 max-w-2xl mb-8">
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-foreground opacity-30" />
            <p className="text-foreground opacity-50 text-xs sm:text-sm font-light tracking-wide">
              A curated collection of projects spanning full-stack applications and creative explorations
            </p>
          </div>

          {/* Archive Stats */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-foreground opacity-40 text-[10px] tracking-[0.2em] font-mono">
            <span>TOTAL: {allProjects.length} PROJECTS</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">CATEGORY: {getCategoryLabel(activeCategory)}</span>
          </div>
        </div>

        {/* Filter Tabs - Archive Style */}
        <div className="mb-12 md:mb-16">
          <div className="text-foreground opacity-40 text-[10px] tracking-[0.2em] font-mono mb-4">
            FILTER BY CLASSIFICATION
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {["all", "featured", "web"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-5 sm:px-6 py-2.5 sm:py-3 text-xs font-bold tracking-[0.15em] transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-foreground text-background"
                    : "border border-foreground border-opacity-30 text-foreground hover:border-opacity-50"
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
        <div className="space-y-0 border-t border-foreground border-opacity-10">
          {allProjects.map((project, index) => (
            <Link
              key={index}
              href={`/project/${encodeURIComponent(project.title)}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className="block group relative border-b border-foreground border-opacity-10 transition-all duration-500 hover:bg-foreground/5"
            >
              {/* Main Row */}
              <div className="py-5 sm:py-6 md:py-7 grid grid-cols-12 gap-3 sm:gap-4 md:gap-6 items-start md:items-center">
                {/* Archive Index */}
                <div className="col-span-2 sm:col-span-2 md:col-span-1 flex flex-col gap-1">
                  <span className="text-foreground opacity-30 group-hover:opacity-100 text-sm sm:text-base font-mono transition-opacity duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="hidden md:block w-full h-[1px] bg-foreground opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </div>

                {/* Project Title & Info */}
                <div className="col-span-10 sm:col-span-10 md:col-span-5 space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-foreground opacity-30 text-[9px] tracking-[0.15em] font-mono">
                      {getProjectType(index)}
                    </span>
                    <div className="w-px h-2 bg-foreground opacity-20" />
                    <span className="text-foreground opacity-30 text-[9px] tracking-[0.15em] font-mono">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground tracking-tight leading-tight group-hover:translate-x-2 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground opacity-50 leading-relaxed">
                    {project.subtitle}
                  </p>
                  
                  {/* Tech Pills - Mobile */}
                  <div className="flex flex-wrap gap-1.5 pt-2 md:hidden">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[9px] px-2 py-1 border border-foreground border-opacity-20 text-foreground opacity-60 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-[9px] px-2 py-1 text-foreground opacity-40 font-mono">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Tech Stack - Desktop */}
                <div className="hidden md:block col-span-3 space-y-1.5">
                  <p className="text-foreground opacity-30 text-[10px] tracking-[0.15em] font-mono">
                    TECH STACK
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-1 border border-foreground border-opacity-20 text-foreground opacity-60 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-[10px] px-2 py-1 text-foreground opacity-40 font-mono">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Sector */}
                <div className="col-span-6 sm:col-span-5 md:col-span-2 space-y-1">
                  <p className="text-foreground opacity-30 text-[10px] tracking-[0.15em] font-mono">
                    SECTOR
                  </p>
                  <p className="text-foreground text-xs sm:text-sm opacity-70 font-medium">
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
            </Link>
          ))}
        </div>

        {/* Archive Footer */}
        <div className="mt-20 sm:mt-24 space-y-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="h-[1px] flex-1 bg-foreground opacity-20" />
            <span className="text-foreground text-[10px] tracking-[0.2em] sm:tracking-[0.3em] opacity-40 font-mono">
              END OF ARCHIVE
            </span>
            <div className="h-[1px] flex-1 bg-foreground opacity-20" />
          </div>
          
          <div className="text-center text-foreground opacity-30 text-[10px] tracking-[0.2em] font-mono">
            {allProjects.length} PROJECTS ARCHIVED
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;