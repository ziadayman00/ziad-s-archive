// app/admin/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  sector: string;
  images: string[];
  comingSoon: boolean;
  inProgress: boolean;
  category: {
    name: string;
    slug: string;
  } | null;
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchProjects();
  }, [filter]);

  const fetchProjects = async () => {
    try {
      const url = filter === 'all' 
        ? '/api/projects' 
        : `/api/projects?category=${filter}`;
      
      const res = await fetch(url);
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const token = localStorage.getItem('admin_token');
    try {
      await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      fetchProjects();
    } catch (error) {
      alert('Failed to delete project');
    }
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-foreground border-opacity-10 sticky top-0 bg-background z-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl font-black text-foreground tracking-tight truncate">
                ADMIN DASHBOARD
              </h1>
              <p className="text-[10px] sm:text-xs text-foreground opacity-40 font-mono mt-0.5 sm:mt-1 hidden sm:block">
                Project Management System
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/admin/projects/new"
                className="px-3 sm:px-6 py-2 sm:py-2.5 bg-foreground text-background text-[10px] sm:text-xs font-bold tracking-[0.15em] hover:opacity-90"
              >
                <span className="hidden sm:inline">+ NEW PROJECT</span>
                <span className="sm:hidden">+ NEW</span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 sm:px-6 py-2 sm:py-2.5 border border-foreground border-opacity-30 text-foreground text-[10px] sm:text-xs font-bold tracking-[0.15em] hover:bg-foreground hover:text-background"
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-12">
          <div className="border border-foreground border-opacity-10 p-4 sm:p-6">
            <p className="text-foreground text-[10px] sm:text-xs tracking-[0.2em] opacity-40 font-mono mb-1 sm:mb-2">
              TOTAL
            </p>
            <p className="text-2xl sm:text-4xl font-black text-foreground">{projects.length}</p>
          </div>
          <div className="border border-foreground border-opacity-10 p-4 sm:p-6">
            <p className="text-foreground text-[10px] sm:text-xs tracking-[0.2em] opacity-40 font-mono mb-1 sm:mb-2">
              FEATURED
            </p>
            <p className="text-2xl sm:text-4xl font-black text-foreground">
              {projects.filter(p => p.category?.slug === 'featured').length}
            </p>
          </div>
          <div className="border border-foreground border-opacity-10 p-4 sm:p-6">
            <p className="text-foreground text-[10px] sm:text-xs tracking-[0.2em] opacity-40 font-mono mb-1 sm:mb-2">
              IN PROGRESS
            </p>
            <p className="text-2xl sm:text-4xl font-black text-foreground">
              {projects.filter(p => p.inProgress).length}
            </p>
          </div>
          <div className="border border-foreground border-opacity-10 p-4 sm:p-6">
            <p className="text-foreground text-[10px] sm:text-xs tracking-[0.2em] opacity-40 font-mono mb-1 sm:mb-2">
              COMING SOON
            </p>
            <p className="text-2xl sm:text-4xl font-black text-foreground">
              {projects.filter(p => p.comingSoon).length}
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 sm:mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-foreground border-opacity-20 text-foreground focus:border-opacity-50 focus:outline-none text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground opacity-40 hover:opacity-100"
              >
                ×
              </button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {['all', 'featured', 'web', 'design', 'branding'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold tracking-[0.15em] ${
                  filter === cat
                    ? 'bg-foreground text-background'
                    : 'border border-foreground border-opacity-30 text-foreground hover:border-opacity-50'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List */}
        {loading ? (
          <div className="text-center py-12 sm:py-20">
            <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-foreground"></div>
            <p className="text-foreground opacity-40 text-xs sm:text-sm mt-4 font-mono">Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 sm:py-20 border border-foreground border-opacity-10">
            <p className="text-foreground opacity-40 text-base sm:text-lg mb-4">
              {searchQuery ? 'No projects match your search' : 'No projects found'}
            </p>
            {!searchQuery && (
              <Link
                href="/admin/projects/new"
                className="inline-block px-4 sm:px-6 py-2.5 sm:py-3 bg-foreground text-background text-xs font-bold tracking-[0.15em]"
              >
                CREATE YOUR FIRST PROJECT
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-0 border-t border-foreground border-opacity-10">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="border-b border-foreground border-opacity-10 p-4 sm:p-6  hover:bg-opacity-[0.02]"
              >
                <div className="flex items-start gap-3 sm:gap-6">
                  {/* Thumbnail */}
                  {project.images[0] && (
                    <div className="w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0 bg-foreground bg-opacity-5 border border-foreground border-opacity-10 overflow-hidden">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="space-y-2 sm:space-y-3">
                      {/* Title and Badges */}
                      <div>
                        <h3 className="text-base sm:text-xl font-bold text-foreground mb-2 break-words">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {project.category && (
                            <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 border border-foreground border-opacity-20 text-foreground opacity-60 font-mono">
                              {project.category.name}
                            </span>
                          )}
                          {project.inProgress && (
                            <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 border border-foreground border-opacity-50 text-foreground opacity-70 font-mono">
                              IN PROGRESS
                            </span>
                          )}
                          {project.comingSoon && (
                            <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 border border-foreground border-opacity-30 text-foreground opacity-50 font-mono">
                              COMING SOON
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Subtitle */}
                      <p className="text-xs sm:text-sm text-foreground opacity-60 line-clamp-2">
                        {project.subtitle}
                      </p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-foreground opacity-40 font-mono">
                        <span>{project.year}</span>
                        <span>•</span>
                        <span className="truncate">{project.sector}</span>
                      </div>

                      {/* Actions - Mobile friendly */}
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <Link
                          href={`/admin/projects/edit/${project.id}`}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 border border-foreground border-opacity-30 text-foreground text-[10px] sm:text-xs font-bold tracking-[0.15em] hover:bg-foreground hover:text-background"
                        >
                          EDIT
                        </Link>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 border border-red-500 border-opacity-30 text-red-500 text-[10px] sm:text-xs font-bold tracking-[0.15em] hover:bg-red-500 hover:text-white"
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}