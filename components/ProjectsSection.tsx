"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import projectsData from "@/projects.json";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Project {
  id: string;
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
  category: Category | null;
}

interface JsonProject {
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
  featuredProjects: JsonProject[];
  webProjects: JsonProject[];
}

const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [clickedProjectId, setClickedProjectId] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);

  useEffect(() => {
    fetchCategories();
    fetchAllProjects();
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    filterProjects();
  }, [activeCategory]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([
        { id: 'featured', name: 'Featured', slug: 'featured' },
        { id: 'web', name: 'Web', slug: 'web' },
      ]);
    }
  };

  const fetchAllProjects = async () => {
    try {
      setLoading(true);
      
      let apiProjects: Project[] = [];
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          apiProjects = await res.json();
        }
      } catch (error) {
        console.error('Error fetching API projects:', error);
      }

      const data = projectsData as ProjectsData;
      const jsonProjects: Project[] = [];

      data.featuredProjects.forEach((project, index) => {
        jsonProjects.push({
          id: `json-featured-${index}`,
          ...project,
          category: { id: 'featured', name: 'Featured', slug: 'featured' }
        });
      });

      data.webProjects.forEach((project, index) => {
        jsonProjects.push({
          id: `json-web-${index}`,
          ...project,
          category: { id: 'web', name: 'Web', slug: 'web' }
        });
      });

      const allProjects = [...apiProjects];
      jsonProjects.forEach(jsonProject => {
        const exists = allProjects.some(p => p.title === jsonProject.title);
        if (!exists) {
          allProjects.push(jsonProject);
        }
      });

      setProjects(allProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    if (activeCategory === 'all') {
      return;
    }
  };

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category?.slug === activeCategory);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (!isMobile) {
      setHoveredProject(index);
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({ 
        x: e.clientX, 
        y: e.clientY 
      });
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoveredProject(null);
    }
  };

  const getStatusLabel = (project: Project): string => {
    if (project.comingSoon) return "SOON";
    if (project.inProgress) return "WIP";
    return "LIVE";
  };

  const getStatusStyle = (project: Project): string => {
    if (project.comingSoon) {
      return "bg-foreground/10 text-foreground/50";
    }
    if (project.inProgress) {
      return "bg-foreground/20 text-foreground/70";
    }
    return "bg-foreground text-background";
  };

  const getCategoryLabel = (category: string): string => {
    if (category === 'all') return 'ALL PROJECTS';
    const cat = categories.find(c => c.slug === category);
    return cat ? cat.name.toUpperCase() : category.toUpperCase();
  };

  const getProjectLink = (project: Project): string => {
    if (project.id.startsWith('json-')) {
      return `/project/${encodeURIComponent(project.title)}`;
    }
    return `/project/${project.id}`;
  };

  const handleProjectClick = (e: React.MouseEvent, project: Project) => {
    e.preventDefault();
    setClickedProjectId(project.id);
    setLoadingProgress(0);
    
    const duration = 800;
    const steps = 60;
    const increment = 100 / steps;
    let currentStep = 0;
    
    const progressInterval = setInterval(() => {
      currentStep++;
      setLoadingProgress(prev => Math.min(prev + increment, 100));
      
      if (currentStep >= steps) {
        clearInterval(progressInterval);
        setTimeout(() => {
          window.location.href = getProjectLink(project);
        }, 100);
      }
    }, duration / steps);
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen bg-background py-24 sm:py-32 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgb(245, 245, 220) 1px, transparent 1px), linear-gradient(90deg, rgb(245, 245, 220) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Archive Markers */}
      <div className="absolute top-6 sm:top-8 md:top-12 left-4 sm:left-6 lg:left-12 xl:left-16 text-foreground opacity-20 text-[10px] tracking-[0.3em] font-mono">
        <div>SEC.02</div>
        <div className="mt-1 text-[8px]">————</div>
      </div>

      {/* Floating Project Image Preview (Desktop Only) */}
      {!isMobile && hoveredProject !== null && filteredProjects[hoveredProject]?.images?.[0] && (
        <div
          className="fixed pointer-events-none z-50 transition-opacity duration-300"
          style={{
            left: `${mousePosition.x + 20}px`,
            top: `${mousePosition.y + 20}px`,
            opacity: hoveredProject !== null ? 1 : 0,
          }}
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/20 to-transparent blur-xl transform scale-110" />
            {/* Image container */}
            <div className="relative w-72 h-48 rounded overflow-hidden shadow-2xl border border-foreground/10 bg-background">
              <img
                src={filteredProjects[hoveredProject].images[0]}
                alt={filteredProjects[hoveredProject].title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {/* Project title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <p className="text-xs font-mono tracking-wider opacity-80">
                  {filteredProjects[hoveredProject].title}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-[1600px] mx-auto">
        {/* Archive Header */}
        <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
            <div className="w-6 sm:w-8 md:w-12 h-[1px] bg-foreground opacity-30" />
            <span className="text-foreground text-[9px] sm:text-[10px] md:text-xs tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] opacity-40 font-mono whitespace-nowrap">
              PROJECT ARCHIVE
            </span>
          </div>

          <h2 className="text-[clamp(2.5rem,12vw,8rem)] font-black text-foreground leading-[0.9] tracking-[-0.02em] mb-4 sm:mb-6">
            SELECTED
            <br />
            <span className="inline-block mt-1 sm:mt-2 md:mt-3">WORKS</span>
          </h2>

          <div className="flex items-start sm:items-center gap-2 sm:gap-3 md:gap-4 max-w-2xl mb-6 sm:mb-8">
            <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent to-foreground opacity-30 flex-shrink-0 mt-2 sm:mt-0" />
            <p className="text-foreground opacity-50 text-xs sm:text-sm leading-relaxed font-light tracking-wide">
              A curated collection of projects spanning full-stack applications and creative explorations
            </p>
          </div>

          {/* Archive Stats */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-foreground opacity-40 text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] font-mono">
            <span>TOTAL: {filteredProjects.length}</span>
            <span>•</span>
            <span>FILTER: {getCategoryLabel(activeCategory)}</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-mono tracking-[0.12em] sm:tracking-[0.15em] transition-all duration-300 whitespace-nowrap ${
                activeCategory === "all"
                  ? "bg-foreground text-background"
                  : "bg-foreground/5 text-foreground/60 hover:bg-foreground/10 hover:text-foreground"
              }`}
            >
              ALL
            </button>
            
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.slug)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-mono tracking-[0.12em] sm:tracking-[0.15em] transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category.slug
                    ? "bg-foreground text-background"
                    : "bg-foreground/5 text-foreground/60 hover:bg-foreground/10 hover:text-foreground"
                }`}
              >
                {category.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-foreground"></div>
            <p className="text-foreground opacity-40 text-sm mt-4 font-mono tracking-wider">
              LOADING PROJECTS...
            </p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 border border-foreground border-opacity-10">
            <p className="text-foreground opacity-40 text-lg mb-4">No projects found</p>
            <p className="text-foreground opacity-30 text-sm font-mono">
              Try selecting a different category
            </p>
          </div>
        ) : (
          <>
            {/* Projects List */}
            <div className="space-y-0">
              {filteredProjects.map((project, index) => (
                <Link
                  key={project.id}
                  href={getProjectLink(project)}
                  onClick={(e) => handleProjectClick(e, project)}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={handleMouseLeave}
                  className={`block group relative transition-all duration-300 cursor-pointer overflow-hidden ${
                    hoveredProject === index ? 'bg-foreground/[0.02]' : ''
                  } ${clickedProjectId === project.id ? 'bg-foreground/5' : ''}`}
                >
                  {/* Loading Animation */}
                  {clickedProjectId === project.id && (
                    <>
                      <div 
                        className="absolute top-0 left-0 h-[2px] bg-foreground transition-all duration-100 ease-linear z-20"
                        style={{ width: `${loadingProgress}%` }}
                      />
                      
                      <div className="absolute inset-0 z-10">
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
                          style={{
                            animation: 'shimmer 1s infinite',
                            transform: `translateX(${loadingProgress - 100}%)`
                          }}
                        />
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center z-30 bg-background/80 backdrop-blur-sm">
                        <div className="text-center space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-foreground rounded-full animate-pulse" />
                            <span className="text-foreground text-xs font-mono tracking-[0.2em]">
                              LOADING
                            </span>
                            <div className="w-1.5 h-1.5 bg-foreground rounded-full animate-pulse animation-delay-200" />
                          </div>
                          <div className="text-foreground opacity-60 text-[10px] font-mono">
                            {Math.round(loadingProgress)}%
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <style jsx>{`
                    @keyframes shimmer {
                      0% { transform: translateX(-100%); }
                      100% { transform: translateX(100%); }
                    }
                    .animation-delay-200 {
                      animation-delay: 200ms;
                    }
                  `}</style>

                  {/* Main Content */}
                  <div className={`py-4 sm:py-5 md:py-6 transition-all duration-300 border-b border-foreground/5 ${
                    clickedProjectId === project.id ? 'opacity-0' : ''
                  }`}>
                    
                    {/* Mobile Layout */}
                    <div className="lg:hidden space-y-3">
                      {/* Index + Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-foreground/30 group-hover:text-foreground/100 text-sm font-mono transition-all duration-300">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="flex items-center gap-2">
                            {project.category && (
                              <span className="text-foreground/30 text-[9px] tracking-[0.12em] font-mono uppercase">
                                {project.category.name}
                              </span>
                            )}
                            <span className="text-foreground/20 text-[9px]">•</span>
                            <span className="text-foreground/30 text-[9px] tracking-[0.12em] font-mono">
                              {project.year}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`text-[9px] px-2.5 py-1 font-mono tracking-[0.1em] ${getStatusStyle(project)}`}
                        >
                          {getStatusLabel(project)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight leading-tight group-hover:translate-x-1 transition-transform duration-300">
                        {project.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-xs text-foreground/60 leading-relaxed">
                        {project.subtitle}
                      </p>

                      {/* Sector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-foreground/50">
                          {project.sector}
                        </span>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className="text-[9px] px-2 py-0.5 bg-foreground/5 text-foreground/50 font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="text-[9px] text-foreground/30 font-mono">
                            +{project.tech.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Mobile Image Preview */}
                      {project.images?.[0] && (
                        <div className="w-full h-32 sm:h-40 rounded overflow-hidden bg-foreground/5 mt-2">
                          <img
                            src={project.images[0]}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:grid grid-cols-12 gap-4 md:gap-6 items-center">
                      {/* Index */}
                      <div className="col-span-1 flex items-center gap-2">
                        <span className="text-foreground/30 group-hover:text-foreground/100 text-sm font-mono transition-all duration-300">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Title & Category */}
                      <div className="col-span-4">
                        <div className="flex items-center gap-2 mb-0.5">
                          {project.category && (
                            <span className="text-foreground/30 text-[9px] tracking-[0.12em] font-mono uppercase">
                              {project.category.name}
                            </span>
                          )}
                          <span className="text-foreground/20 text-[9px]">•</span>
                          <span className="text-foreground/30 text-[9px] tracking-[0.12em] font-mono">
                            {project.year}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight leading-tight group-hover:translate-x-1 transition-transform duration-300">
                          {project.title}
                        </h3>
                      </div>

                      {/* Tech Stack */}
                      <div className="col-span-3 flex items-center gap-1.5">
                        {project.tech.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="text-[9px] px-2 py-0.5 bg-foreground/5 text-foreground/50 font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="text-[9px] text-foreground/30 font-mono">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Sector */}
                      <div className="col-span-2">
                        <span className="text-xs text-foreground/50">
                          {project.sector}
                        </span>
                      </div>

                      {/* Status */}
                      <div className="col-span-2 flex justify-end">
                        <span
                          className={`text-[9px] px-2.5 py-1 font-mono tracking-[0.1em] ${getStatusStyle(project)}`}
                        >
                          {getStatusLabel(project)}
                        </span>
                      </div>
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Archive Footer */}
            <div className="mt-16 sm:mt-20 md:mt-24 space-y-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-[1px] flex-1 bg-foreground opacity-10" />
                <span className="text-foreground text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] opacity-30 font-mono whitespace-nowrap">
                  END OF ARCHIVE
                </span>
                <div className="h-[1px] flex-1 bg-foreground opacity-10" />
              </div>
              
              <div className="text-center text-foreground opacity-20 text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] font-mono">
                {filteredProjects.length} ENTRIES
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;