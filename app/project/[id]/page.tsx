// app/project/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { projects, categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import projectsData from "@/projects.json";

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
    // First, try to get from database by ID
    const result = await db
      .select({
        project: projects,
        category: categories,
      })
      .from(projects)
      .leftJoin(categories, eq(projects.categoryId, categories.id))
      .where(eq(projects.id, idOrTitle))
      .limit(1);

    if (result.length > 0) {
      return {
        ...result[0].project,
        category: result[0].category,
      };
    }

    // If not found in database, try to find in JSON by title
    const decodedTitle = decodeURIComponent(idOrTitle);
    const data = projectsData as ProjectsData;
    
    // Search in featured projects
    const featuredProject = data.featuredProjects.find(
      p => p.title.toLowerCase() === decodedTitle.toLowerCase()
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

    // Search in web projects
    const webProject = data.webProjects.find(
      p => p.title.toLowerCase() === decodedTitle.toLowerCase()
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

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* Navigation */}
      <nav className="fixed top-30 left-0 right-0 z-[40] px-6 flex justify-between items-center mix-blend-difference">
        <Link 
          href="/#projects"
          className="text-sm font-mono tracking-[0.2em] opacity-70 hover:opacity-100 transition-opacity"
        >
          ← BACK TO ARCHIVE
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 lg:px-12 max-w-[1600px] mx-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-xs font-mono tracking-[0.2em] opacity-50">
            <span>{project.year}</span>
            <span className="w-px h-3 bg-foreground/50" />
            <span>{project.sector}</span>
            {project.category && (
              <>
                <span className="w-px h-3 bg-foreground/50" />
                <span>{project.category.name}</span>
              </>
            )}
          </div>
          
          <h1 className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9] tracking-tight">
            {project.title}
          </h1>
          
          <p className="text-xl md:text-2xl opacity-70 max-w-2xl font-light leading-relaxed">
            {project.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="px-6 lg:px-12 pb-32 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* Project Info */}
            <div className="space-y-8 border-t border-foreground/10 pt-8">
              {(project.responsibility || project.impact) && (
                <div className="grid grid-cols-2 gap-8">
                  {project.responsibility && (
                    <div>
                      <h3 className="text-[10px] font-mono tracking-[0.2em] opacity-40 mb-3">ROLE</h3>
                      <p className="text-sm opacity-80">{project.responsibility}</p>
                    </div>
                  )}
                  {project.impact && (
                    <div>
                      <h3 className="text-[10px] font-mono tracking-[0.2em] opacity-40 mb-3">IMPACT</h3>
                      <p className="text-sm opacity-80">{project.impact}</p>
                    </div>
                  )}
                </div>
              )}
              
              <div>
                <h3 className="text-[10px] font-mono tracking-[0.2em] opacity-40 mb-3">TECH STACK</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-3 py-1 border border-foreground/20 opacity-70 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                {project.live && project.live !== "#" && !project.comingSoon && (
                  <a 
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-foreground text-background text-center text-xs font-bold tracking-[0.2em] hover:opacity-90 transition-opacity"
                  >
                    VISIT WEBSITE
                  </a>
                )}
                {project.github && project.github !== "#" && (
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 border border-foreground/30 text-center text-xs font-bold tracking-[0.2em] hover:bg-foreground hover:text-background transition-all"
                  >
                    VIEW SOURCE
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-foreground/10 pt-8">
              <h3 className="text-[10px] font-mono tracking-[0.2em] opacity-40 mb-6">OVERVIEW</h3>
              <p className="text-base leading-relaxed opacity-80">
                {project.description}
              </p>
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="border-t border-foreground/10 pt-8">
                <h3 className="text-[10px] font-mono tracking-[0.2em] opacity-40 mb-6">KEY FEATURES</h3>
                <ul className="space-y-4">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex gap-4 text-sm opacity-80">
                      <span className="font-mono opacity-40">{String(i + 1).padStart(2, '0')}</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - Images */}
          <div className="lg:col-span-8 space-y-8">
            {project.images.map((img, i) => (
              <div key={i} className="relative group overflow-hidden bg-foreground/5">
                <img
                  src={img}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 border border-foreground/10 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}