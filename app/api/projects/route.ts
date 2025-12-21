import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects, categories } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    if (category) {
      // Filter by category
      const result = await db
        .select({
          project: projects,
          category: categories,
        })
        .from(projects)
        .leftJoin(categories, eq(projects.categoryId, categories.id))
        .where(eq(categories.slug, category));

      const formattedProjects = result.map(({ project, category }) => ({
        ...project,
        category,
      }));

      return NextResponse.json(formattedProjects);
    } else {
      // Get all projects
      const result = await db
        .select({
          project: projects,
          category: categories,
        })
        .from(projects)
        .leftJoin(categories, eq(projects.categoryId, categories.id));

      const formattedProjects = result.map(({ project, category }) => ({
        ...project,
        category,
      }));

      return NextResponse.json(formattedProjects);
    }
  } catch (error) {
    console.error('Fetch projects error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const newProject = await db.insert(projects).values({
      title: body.title,
      subtitle: body.subtitle,
      year: body.year,
      sector: body.sector,
      responsibility: body.responsibility,
      impact: body.impact,
      tech: body.tech,
      description: body.description,
      features: body.features || [],
      images: body.images || [],
      live: body.live || '#',
      github: body.github || '#',
      comingSoon: body.comingSoon || false,
      inProgress: body.inProgress || false,
      categoryId: body.categoryId,
      order: body.order || 0,
    }).returning();

    return NextResponse.json(newProject[0]);
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}