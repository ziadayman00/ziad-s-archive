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
      setIsMobile(window.innerWidth < 768);
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
            <span>TOTAL: {filteredProjects.length}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">FILTER: {getCategoryLabel(activeCategory)}</span>
          </div>
        </div>

        {/* Filter Tabs - Minimalist */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 text-[10px] font-mono tracking-[0.15em] transition-all duration-300 ${
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
                className={`px-4 py-2 text-[10px] font-mono tracking-[0.15em] transition-all duration-300 ${
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
            {/* Projects Archive List - Sleeker Design */}
            <div className="space-y-px">
              {filteredProjects.map((project, index) => (
                <a
                  key={project.id}
                  href={getProjectLink(project)}
                  onClick={(e) => handleProjectClick(e, project)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  className={`block group relative transition-all duration-300 cursor-pointer overflow-hidden ${
                    hoveredProject === index ? 'bg-foreground/[0.02]' : ''
                  } ${clickedProjectId === project.id ? 'bg-foreground/5' : ''}`}
                >
                  {/* Enhanced Loading Animation */}
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

                  {/* Main Row - Thinner & Reordered */}
                  <div className={`py-4 sm:py-5 grid grid-cols-12 gap-3 sm:gap-4 md:gap-6 items-center transition-all duration-300 border-b border-foreground/5 ${
                    clickedProjectId === project.id ? 'opacity-0' : ''
                  }`}>
                    
                    {/* Index + Year */}
                    <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
                      <span className="text-foreground/30 group-hover:text-foreground/100 text-sm font-mono transition-all duration-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Title & Category */}
                    <div className="col-span-10 sm:col-span-5 md:col-span-4">
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
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground tracking-tight leading-tight group-hover:translate-x-1 transition-transform duration-300">
                        {project.title}
                      </h3>
                    </div>

                    {/* Tech Stack - Compact */}
                    <div className="hidden md:flex col-span-3 items-center gap-1.5">
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

                    {/* Sector - Compact */}
                    <div className="hidden lg:block col-span-2">
                      <span className="text-xs text-foreground/50">
                        {project.sector}
                      </span>
                    </div>

                    {/* Status - Smaller */}
                    <div className="col-span-12 sm:col-span-5 md:col-span-2 flex justify-end">
                      <span
                        className={`text-[9px] px-2.5 py-1 font-mono tracking-[0.1em] ${getStatusStyle(project)}`}
                      >
                        {getStatusLabel(project)}
                      </span>
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Mobile Tech Stack */}
                  <div className="md:hidden px-4 pb-3 -mt-1">
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
                  </div>
                </a>
              ))}
            </div>

            {/* Archive Footer */}
            <div className="mt-20 sm:mt-24 space-y-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-[1px] flex-1 bg-foreground opacity-10" />
                <span className="text-foreground text-[10px] tracking-[0.2em] opacity-30 font-mono">
                  END OF ARCHIVE
                </span>
                <div className="h-[1px] flex-1 bg-foreground opacity-10" />
              </div>
              
              <div className="text-center text-foreground opacity-20 text-[10px] tracking-[0.2em] font-mono">
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