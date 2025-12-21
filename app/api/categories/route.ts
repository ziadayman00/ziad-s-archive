import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { categories } from '@/lib/db/schema';

export async function GET() {
  try {
    const allCategories = await db.select().from(categories).orderBy(categories.order);
    return NextResponse.json(allCategories);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
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
    const slug = body.name.toLowerCase().replace(/\s+/g, '-');

    const newCategory = await db.insert(categories).values({
      name: body.name,
      slug,
      description: body.description,
      order: body.order || 0,
    }).returning();

    return NextResponse.json(newCategory[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}