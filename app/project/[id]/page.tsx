// app/project/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { projects, categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import projectsData from "@/projects.json";
import ScrollToTop from "./ScrollToTop";

interface PageProps {
  params: Promise<{ id: string }>;
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

async function getProject(idOrTitle: string) {
  try {
    const decodedParam = decodeURIComponent(idOrTitle);
    
    const data = projectsData as ProjectsData;
    
    const featuredProject = data.featuredProjects.find(
      p => p.title.toLowerCase() === decodedParam.toLowerCase()
    );
    
    if (featuredProject) {
      return {
        ...featuredProject,
        id: 'json-featured',
        category: { id: 'featured', name: 'Featured', slug: 'featured' },
        categoryId: 'featured',
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    const webProject = data.webProjects.find(
      p => p.title.toLowerCase() === decodedParam.toLowerCase()
    );
    
    if (webProject) {
      return {
        ...webProject,
        id: 'json-web',
        category: { id: 'web', name: 'Web', slug: 'web' },
        categoryId: 'web',
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    const result = await db
      .select({
        project: projects,
        category: categories,
      })
      .from(projects)
      .leftJoin(categories, eq(projects.categoryId, categories.id))
      .where(eq(projects.id, decodedParam))
      .limit(1);

    if (result.length > 0) {
      return {
        ...result[0].project,
        category: result[0].category,
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  const isDesignCategory = project.category?.slug === 'design' || project.category?.slug === 'branding';

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* Back Button */}
      <Link 
        href="/#projects" 
        className="fixed top-20 sm:top-24 left-4 sm:left-6 lg:left-12 z-40 group flex items-center gap-2 px-3 py-1.5 bg-background/90 backdrop-blur-sm border border-foreground/10 hover:border-foreground/30 transition-all rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-0.5 transition-transform">
          <path d="M19 12H5"/>
          <path d="M12 19l-7-7 7-7"/>
        </svg>
        <span className="text-[10px] sm:text-xs font-mono tracking-widest opacity-60 group-hover:opacity-100">BACK</span>
      </Link>

      {/* Status Badges - Positioned below main navbar */}
      {(project.inProgress || project.comingSoon) && (
        <div className="fixed top-20 sm:top-24 right-4 sm:right-6 lg:right-12 z-40 flex items-center gap-2">
          {project.inProgress && (
            <span className="text-[9px] sm:text-[10px] px-2 sm:px-3 py-1 sm:py-1.5 bg-background/90 backdrop-blur-sm border border-foreground/30 font-mono tracking-[0.15em] opacity-60">
              IN PROGRESS
            </span>
          )}
          {project.comingSoon && (
            <span className="text-[9px] sm:text-[10px] px-2 sm:px-3 py-1 sm:py-1.5 bg-background/90 backdrop-blur-sm border border-foreground/30 font-mono tracking-[0.15em] opacity-60">
              COMING SOON
            </span>
          )}
        </div>
      )}

      {/* Enhanced Hero Section */}
      <section className="relative pt-28 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto">
        <div className="space-y-4 sm:space-y-6">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-mono tracking-[0.15em] sm:tracking-[0.2em] opacity-50">
            <span>{project.year}</span>
            <span className="w-px h-3 bg-foreground/50" />
            <span className="truncate">{project.sector}</span>
            {project.category && (
              <>
                <span className="w-px h-3 bg-foreground/50" />
                <span className="truncate">{project.category.name}</span>
              </>
            )}
          </div>
          
          {/* Title */}
          <h1 className="text-[clamp(2rem,10vw,6rem)] font-black leading-[0.9] tracking-tight break-words">
            {project.title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-base sm:text-xl lg:text-2xl opacity-70 max-w-3xl font-light leading-relaxed">
            {project.subtitle}
          </p>

          {/* Mobile Quick Actions */}
          <div className="flex flex-wrap gap-2 sm:gap-3 lg:hidden pt-4">
            {project.live && project.live !== "#" && !project.comingSoon && (
              <a 
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] py-3 bg-foreground text-background text-center text-[10px] font-bold tracking-[0.2em] hover:opacity-90"
              >
                {isDesignCategory ? 'VIEW PROJECT' : 'VISIT SITE'}
              </a>
            )}
            {project.github && project.github !== "#" && !isDesignCategory && (
              <a 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] py-3 border border-foreground/30 text-center text-[10px] font-bold tracking-[0.2em] hover:bg-foreground hover:text-background"
              >
                SOURCE
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="px-4 sm:px-6 lg:px-12 pb-16 sm:pb-24 lg:pb-32 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-20">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-4 space-y-8 sm:space-y-12">
            
            {/* Project Info Card */}
            <div className="space-y-6 sm:space-y-8 border border-foreground/10 p-4 sm:p-6 lg:p-8 bg-foreground/[0.02]">
              
              {/* Role & Impact */}
              {(project.responsibility || project.impact) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.responsibility && (
                    <div>
                      <h3 className="text-[10px] font-mono tracking-[0.2em] opacity-40 mb-2 sm:mb-3">ROLE</h3>
                      <p className="text-xs sm:text-sm opacity-80 leading-relaxed">{project.responsibility}</p>
                    </div>
                  )}
                  {project.impact && (
                    <div>
                      <h3 className="text-[10px] font-mono tracking-[0.2em] opacity-40 mb-2 sm:mb-3">IMPACT</h3>
                      <p className="text-xs sm:text-sm opacity-80 leading-relaxed">{project.impact}</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Tech Stack / Tools */}
              <div className="pt-6 border-t border-foreground/10">
                <h3 className="text-[10px] font-mono tracking-[0.2em] opacity-40 mb-3 sm:mb-4">
                  {isDesignCategory ? 'TOOLS USED' : 'TECH STACK'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span 
                      key={t} 
                      className="text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 border border-foreground/20 opacity-70 font-mono hover:opacity-100 hover:border-foreground/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Desktop Action Buttons */}
              <div className="hidden lg:flex flex-col gap-3 pt-6 border-t border-foreground/10">
                {project.live && project.live !== "#" && !project.comingSoon && (
                  <a 
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-foreground text-background text-center text-xs font-bold tracking-[0.2em] hover:opacity-90"
                  >
                    {isDesignCategory ? 'VIEW PROJECT' : 'VISIT WEBSITE'}
                  </a>
                )}
                {project.github && project.github !== "#" && !isDesignCategory && (
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 border border-foreground/30 text-center text-xs font-bold tracking-[0.2em] hover:bg-foreground hover:text-background"
                  >
                    VIEW SOURCE CODE
                  </a>
                )}
                {project.comingSoon && (
                  <div className="w-full py-4 border border-foreground/20 text-center text-xs font-bold tracking-[0.2em] opacity-40 cursor-not-allowed">
                    COMING SOON
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-foreground/10 pt-6 sm:pt-8">
              <h3 className="text-[10px] font-mono tracking-[0.2em] opacity-40 mb-4 sm:mb-6">OVERVIEW</h3>
              <div className="prose prose-sm sm:prose-base max-w-none">
                <p className="text-sm sm:text-base leading-relaxed opacity-80 whitespace-pre-line">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="border-t border-foreground/10 pt-6 sm:pt-8">
                <h3 className="text-[10px] font-mono tracking-[0.2em] opacity-40 mb-4 sm:mb-6">KEY FEATURES</h3>
                <ul className="space-y-3 sm:space-y-4">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex gap-3 sm:gap-4 text-xs sm:text-sm opacity-80 group">
                      <span className="font-mono opacity-40 group-hover:opacity-70 flex-shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Additional Info */}
            <div className="border-t border-foreground/10 pt-6 sm:pt-8 text-xs opacity-40 font-mono">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <span>PROJECT #{project.id.slice(0, 8).toUpperCase()}</span>
                {project.category && (
                  <>
                    <span>•</span>
                    <span>{project.category.slug.toUpperCase()}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Images Gallery */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8 lg:space-y-12">
            {/* Image Counter */}
            <div className="flex items-center justify-between pb-4 border-b border-foreground/10">
              <h3 className="text-[10px] font-mono tracking-[0.2em] opacity-40">
                PROJECT GALLERY
              </h3>
              <span className="text-[10px] font-mono tracking-[0.2em] opacity-40">
                {project.images.length} {project.images.length === 1 ? 'IMAGE' : 'IMAGES'}
              </span>
            </div>

            {/* Images */}
            <div className="space-y-6 sm:space-y-8 lg:space-y-12">
              {project.images.map((img, i) => (
                <div key={i} className="relative group">
                  {/* Image Number */}
                  <div className="absolute -top-8 left-0 text-[10px] font-mono tracking-[0.2em] opacity-30 z-10">
                    {String(i + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}
                  </div>
                  
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-foreground/5 border border-foreground/10">
                    <img
                      src={img}
                      alt={`${project.title} screenshot ${i + 1}`}
                      className="w-full h-auto object-cover"
                      loading={i > 0 ? "lazy" : "eager"}
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>

            {/* End Decoration */}
            <div className="flex items-center justify-center pt-8 sm:pt-12 lg:pt-16 pb-4">
              <div className="flex items-center gap-4 opacity-20">
                <div className="w-12 sm:w-20 h-px bg-foreground" />
                <span className="text-[10px] font-mono tracking-[0.2em]">END</span>
                <div className="w-12 sm:w-20 h-px bg-foreground" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <section className="border-t border-foreground/10 bg-foreground/[0.02]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="text-center sm:text-left">
              <p className="text-xs opacity-40 font-mono tracking-[0.2em] mb-2">THANKS FOR VIEWING</p>
              <h3 className="text-lg sm:text-xl font-bold">{project.title}</h3>
            </div>
            
            <Link
              href="/#projects"
              className="px-8 sm:px-12 py-3 sm:py-4 border border-foreground/30 text-xs font-bold tracking-[0.2em] hover:bg-foreground hover:text-background text-center min-w-[200px]"
            >
              VIEW MORE PROJECTS
            </Link>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button - Mobile */}
      <ScrollToTop />
    </main>
  );
}