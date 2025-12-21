// app/admin/projects/edit/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

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
  responsibility: string;
  impact: string;
  tech: string[];
  description: string;
  features: string[];
  images: string[];
  live: string;
  github: string;
  comingSoon: boolean;
  inProgress: boolean;
  categoryId: string;
}

export default function EditProject() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [fetchingProject, setFetchingProject] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    year: '',
    sector: '',
    responsibility: '',
    impact: '',
    tech: [] as string[],
    description: '',
    features: [] as string[],
    images: [] as string[],
    live: '#',
    github: '#',
    comingSoon: false,
    inProgress: false,
    categoryId: '',
  });

  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchCategories();
    fetchProject();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data);
  };

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      const project: Project = await res.json();
      
      setFormData({
        title: project.title,
        subtitle: project.subtitle,
        year: project.year,
        sector: project.sector,
        responsibility: project.responsibility || '',
        impact: project.impact || '',
        tech: project.tech || [],
        description: project.description,
        features: project.features || [],
        images: project.images || [],
        live: project.live || '#',
        github: project.github || '#',
        comingSoon: project.comingSoon || false,
        inProgress: project.inProgress || false,
        categoryId: project.categoryId || '',
      });
    } catch (error) {
      alert('Failed to fetch project');
    } finally {
      setFetchingProject(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    const token = localStorage.getItem('admin_token');

    try {
      const formDataUpload = new FormData();
      Array.from(files).forEach(file => {
        formDataUpload.append('files', file);
      });

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataUpload,
      });

      const data = await res.json();
      
      if (data.success) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...data.urls],
        }));
      } else {
        alert('Failed to upload images');
      }
    } catch (error) {
      alert('Error uploading images');
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addTech = () => {
    if (techInput.trim()) {
      setFormData(prev => ({
        ...prev,
        tech: [...prev.tech, techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const removeTech = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tech: prev.tech.filter((_, i) => i !== index),
    }));
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('admin_token');

    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        alert('Failed to update project');
      }
    } catch (error) {
      alert('Error updating project');
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = categories.find(c => c.id === formData.categoryId);
  const isDesignCategory = selectedCategory?.slug === 'design' || selectedCategory?.slug === 'branding';

  if (fetchingProject) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-foreground"></div>
          <p className="text-foreground opacity-40 text-sm mt-4 font-mono">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-foreground border-opacity-10 sticky top-0 bg-background z-50">
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-foreground tracking-tight">
                EDIT PROJECT
              </h1>
              <p className="text-xs text-foreground opacity-40 font-mono mt-1">
                Update project details
              </p>
            </div>
            <Link
              href="/admin/dashboard"
              className="px-6 py-2.5 border border-foreground border-opacity-30 text-foreground text-xs font-bold tracking-[0.15em] hover:bg-foreground hover:text-background transition-all"
            >
              ← BACK
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="border border-foreground border-opacity-10 p-8">
            <h2 className="text-lg font-bold text-foreground mb-6 tracking-tight">
              BASIC INFORMATION
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-foreground text-xs tracking-[0.2em] opacity-40 font-mono mb-3">
                  PROJECT TITLE *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-foreground border-opacity-20 text-foreground focus:border-opacity-50 focus:outline-none"
                  placeholder="Amazing Project"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-foreground text-xs tracking-[0.2em] opacity-40 font-mono mb-3">
                  SUBTITLE *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-foreground border-opacity-20 text-foreground focus:border-opacity-50 focus:outline-none"
                  placeholder="Brief description of the project"
                />
              </div>

              <div>
                <label className="block text-foreground text-xs tracking-[0.2em] opacity-40 font-mono mb-3">
                  YEAR *
                </label>
                <input
                  type="text"
                  required
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-foreground border-opacity-20 text-foreground focus:border-opacity-50 focus:outline-none"
                  placeholder="2025"
                />
              </div>

              <div>
                <label className="block text-foreground text-xs tracking-[0.2em] opacity-40 font-mono mb-3">
                  SECTOR *
                </label>
                <input
                  type="text"
                  required
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-foreground border-opacity-20 text-foreground focus:border-opacity-50 focus:outline-none"
                  placeholder="Full-Stack, Design, etc."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-foreground text-xs tracking-[0.2em] opacity-40 font-mono mb-3">
                  CATEGORY *
                </label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-foreground border-opacity-20 text-foreground focus:border-opacity-50 focus:outline-none"
                >
                  <option value="">Select category...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-foreground text-xs tracking-[0.2em] opacity-40 font-mono mb-3">
                  STATUS
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.inProgress}
                      onChange={(e) => setFormData({ ...formData, inProgress: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-foreground">In Progress</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.comingSoon}
                      onChange={(e) => setFormData({ ...formData, comingSoon: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-foreground">Coming Soon</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-foreground text-xs tracking-[0.2em] opacity-40 font-mono mb-3">
                  RESPONSIBILITY
                </label>
                <input
                  type="text"
                  value={formData.responsibility}
                  onChange={(e) => setFormData({ ...formData, responsibility: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-foreground border-opacity-20 text-foreground focus:border-opacity-50 focus:outline-none"
                  placeholder="Development, UI/UX, Architecture"
                />
              </div>

              <div>
                <label className="block text-foreground text-xs tracking-[0.2em] opacity-40 font-mono mb-3">
                  IMPACT
                </label>
                <input
                  type="text"
                  value={formData.impact}
                  onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-foreground border-opacity-20 text-foreground focus:border-opacity-50 focus:outline-none"
                  placeholder="1000+ daily users"
                />
              </div>

              <div>
                <label className="block text-foreground text-xs tracking-[0.2em] opacity-40 font-mono mb-3">
                  {isDesignCategory ? 'PROJECT LINK (e.g. Behance)' : 'LIVE URL'}
                </label>
                <input
                  type="url"
                  value={formData.live}
                  onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-foreground border-opacity-20 text-foreground focus:border-opacity-50 focus:outline-none"
                  placeholder="https://example.com"
                />
              </div>

              {!isDesignCategory && (
                <div>
                  <label className="block text-foreground text-xs tracking-[0.2em] opacity-40 font-mono mb-3">
                    GITHUB URL
                  </label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-foreground border-opacity-20 text-foreground focus:border-opacity-50 focus:outline-none"
                    placeholder="https://github.com/..."
                  />
                </div>
              )}

              <div className="md:col-span-2">
                <label className="block text-foreground text-xs tracking-[0.2em] opacity-40 font-mono mb-3">
                  DESCRIPTION *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-transparent border border-foreground border-opacity-20 text-foreground focus:border-opacity-50 focus:outline-none resize-none"
                  placeholder="Detailed project description..."
                />
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="border border-foreground border-opacity-10 p-8">
            <h2 className="text-lg font-bold text-foreground mb-6 tracking-tight">
              {isDesignCategory ? 'TOOLS USED' : 'TECH STACK'} *
            </h2>
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                className="flex-1 px-4 py-3 bg-transparent border border-foreground border-opacity-20 text-foreground focus:border-opacity-50 focus:outline-none"
                placeholder={isDesignCategory ? "Add tool (e.g. Figma, Photoshop)..." : "Add technology..."}
              />
              <button
                type="button"
                onClick={addTech}
                className="px-6 py-3 bg-foreground text-background text-xs font-bold tracking-[0.15em]"
              >
                ADD
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tech.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 border border-foreground border-opacity-20 text-foreground text-sm"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeTech(index)}
                    className="text-foreground opacity-40 hover:opacity-100"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="border border-foreground border-opacity-10 p-8">
            <h2 className="text-lg font-bold text-foreground mb-6 tracking-tight">
              KEY FEATURES
            </h2>
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                className="flex-1 px-4 py-3 bg-transparent border border-foreground border-opacity-20 text-foreground focus:border-opacity-50 focus:outline-none"
                placeholder="Add feature..."
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-6 py-3 bg-foreground text-background text-xs font-bold tracking-[0.15em]"
              >
                ADD
              </button>
            </div>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-4 py-3 border border-foreground border-opacity-10"
                >
                  <span className="flex-1 text-foreground text-sm">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-foreground opacity-40 hover:opacity-100"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="border border-foreground border-opacity-10 p-8">
            <h2 className="text-lg font-bold text-foreground mb-6 tracking-tight">
              PROJECT IMAGES *
            </h2>
            <div className="mb-6">
              <label className="block w-full cursor-pointer">
                <div className="border-2 border-dashed border-foreground border-opacity-20 p-12 text-center hover:border-opacity-40 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {uploadingImages ? (
                    <p className="text-foreground opacity-60">Uploading...</p>
                  ) : (
                    <>
                      <p className="text-foreground opacity-60 mb-2">
                        Click to upload images
                      </p>
                      <p className="text-foreground opacity-40 text-sm">
                        or drag and drop
                      </p>
                    </>
                  )}
                </div>
              </label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Upload ${index + 1}`}
                    className="w-full aspect-square object-cover border border-foreground border-opacity-10"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || formData.images.length === 0}
              className="flex-1 py-4 bg-foreground text-background font-bold text-sm tracking-[0.2em] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'UPDATING...' : 'UPDATE PROJECT'}
            </button>
            <Link
              href="/admin/dashboard"
              className="px-8 py-4 border border-foreground border-opacity-30 text-foreground font-bold text-sm tracking-[0.2em] hover:bg-foreground hover:text-background transition-all"
            >
              CANCEL
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}