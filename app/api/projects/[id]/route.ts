// app/api/projects/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects, categories } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET single project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const result = await db
      .select({
        project: projects,
        category: categories,
      })
      .from(projects)
      .leftJoin(categories, eq(projects.categoryId, categories.id))
      .where(eq(projects.id, id))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    const formattedProject = {
      ...result[0].project,
      category: result[0].category,
    };

    return NextResponse.json(formattedProject);
  } catch (error) {
    console.error('Fetch project error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// UPDATE project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updatedProject = await db
      .update(projects)
      .set({
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
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id))
      .returning();

    return NextResponse.json(updatedProject[0]);
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await db.delete(projects).where(eq(projects.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}