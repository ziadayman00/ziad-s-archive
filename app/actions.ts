"use server";

import projectsData from "@/projects.json";

export interface Project {
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

export async function getProjects(): Promise<Project[]> {
  const featured = projectsData.featuredProjects;
  const web = projectsData.webProjects;
  return [...featured, ...web];
}

export async function getProject(title: string): Promise<Project | undefined> {
  const allProjects = await getProjects();
  // Decode the title to handle URL encoding
  const decodedTitle = decodeURIComponent(title);
  return allProjects.find((p) => p.title.toLowerCase() === decodedTitle.toLowerCase());
}
