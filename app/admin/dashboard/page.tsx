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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-foreground border-opacity-10 sticky top-0 bg-background z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-foreground tracking-tight">
                ADMIN DASHBOARD
              </h1>
              <p className="text-xs text-foreground opacity-40 font-mono mt-1">
                Project Management System
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/admin/projects/new"
                className="px-6 py-2.5 bg-foreground text-background text-xs font-bold tracking-[0.15em] hover:opacity-90 transition-opacity"
              >
                + NEW PROJECT
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-2.5 border border-foreground border-opacity-30 text-foreground text-xs font-bold tracking-[0.15em] hover:bg-foreground hover:text-background transition-all"
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="border border-foreground border-opacity-10 p-6">
            <p className="text-foreground text-xs tracking-[0.2em] opacity-40 font-mono mb-2">
              TOTAL PROJECTS
            </p>
            <p className="text-4xl font-black text-foreground">{projects.length}</p>
          </div>
          <div className="border border-foreground border-opacity-10 p-6">
            <p className="text-foreground text-xs tracking-[0.2em] opacity-40 font-mono mb-2">
              FEATURED
            </p>
            <p className="text-4xl font-black text-foreground">
              {projects.filter(p => p.category?.slug === 'featured').length}
            </p>
          </div>
          <div className="border border-foreground border-opacity-10 p-6">
            <p className="text-foreground text-xs tracking-[0.2em] opacity-40 font-mono mb-2">
              IN PROGRESS
            </p>
            <p className="text-4xl font-black text-foreground">
              {projects.filter(p => p.inProgress).length}
            </p>
          </div>
          <div className="border border-foreground border-opacity-10 p-6">
            <p className="text-foreground text-xs tracking-[0.2em] opacity-40 font-mono mb-2">
              COMING SOON
            </p>
            <p className="text-4xl font-black text-foreground">
              {projects.filter(p => p.comingSoon).length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex gap-3">
            {['all', 'featured', 'web', 'design'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 text-xs font-bold tracking-[0.15em] transition-all ${
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
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-foreground"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 border border-foreground border-opacity-10">
            <p className="text-foreground opacity-40 text-lg mb-4">No projects found</p>
            <Link
              href="/admin/projects/new"
              className="inline-block px-6 py-3 bg-foreground text-background text-xs font-bold tracking-[0.15em]"
            >
              CREATE YOUR FIRST PROJECT
            </Link>
          </div>
        ) : (
          <div className="space-y-0 border-t border-foreground border-opacity-10">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border-b border-foreground border-opacity-10 p-6 hover:border-opacity-30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-6">
                  {/* Thumbnail */}
                  {project.images[0] && (
                    <div className="w-24 h-24 flex-shrink-0 bg-foreground bg-opacity-5 border border-foreground border-opacity-10 overflow-hidden">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-foreground">
                            {project.title}
                          </h3>
                          {project.category && (
                            <span className="text-xs px-2 py-1 border border-foreground border-opacity-20 text-foreground opacity-60 font-mono">
                              {project.category.name}
                            </span>
                          )}
                          {project.inProgress && (
                            <span className="text-xs px-2 py-1 border border-foreground border-opacity-50 text-foreground opacity-70 font-mono">
                              IN PROGRESS
                            </span>
                          )}
                          {project.comingSoon && (
                            <span className="text-xs px-2 py-1 border border-foreground border-opacity-30 text-foreground opacity-50 font-mono">
                              COMING SOON
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-foreground opacity-60 mb-2">
                          {project.subtitle}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-foreground opacity-40 font-mono">
                          <span>{project.year}</span>
                          <span>•</span>
                          <span>{project.sector}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/projects/edit/${project.id}`}
                          className="px-4 py-2 border border-foreground border-opacity-30 text-foreground text-xs font-bold tracking-[0.15em] hover:bg-foreground hover:text-background transition-all"
                        >
                          EDIT
                        </Link>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="px-4 py-2 border border-red-500 border-opacity-30 text-red-500 text-xs font-bold tracking-[0.15em] hover:bg-red-500 hover:text-white transition-all"
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