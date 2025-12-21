import { db } from './index';
import { categories } from './schema';

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    const defaultCategories = [
      { name: 'Featured', slug: 'featured', order: 1, description: 'Featured projects showcase' },
      { name: 'Web', slug: 'web', order: 2, description: 'Web applications and websites' },
      { name: 'Design', slug: 'design', order: 3, description: 'Design projects and graphics' },
    ];

    for (const category of defaultCategories) {
      await db.insert(categories).values(category).onConflictDoNothing();
      console.log(`✓ Created category: ${category.name}`);
    }

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }

  process.exit(0);
}

seed();