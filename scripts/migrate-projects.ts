// scripts/migrate-projects.ts
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

import { db } from '../lib/db/index.js';
import { projects, categories } from '../lib/db/schema.js';
import { eq } from 'drizzle-orm';
import projectsData from '../projects.json' assert { type: 'json' };

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
  designProjects?: JsonProject[];
}

async function migrateProjects() {
  console.log('🚀 Starting migration from JSON to Database...\n');

  try {
    // Step 1: Create categories if they don't exist
    console.log('📁 Creating categories...');
    
    const categoryMap = new Map<string, string>();
    
    const categoryData = [
      { name: 'Featured', slug: 'featured', description: 'Featured projects', order: 0 },
      { name: 'Web', slug: 'web', description: 'Web applications', order: 1 },
      { name: 'Design', slug: 'design', description: 'Design projects', order: 2 },
      { name: 'Branding', slug: 'branding', description: 'Branding projects', order: 3 },
    ];

    for (const cat of categoryData) {
      const existing = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, cat.slug))
        .limit(1);

      if (existing.length > 0) {
        categoryMap.set(cat.slug, existing[0].id);
        console.log(`  ✓ Category "${cat.name}" already exists`);
      } else {
        const [newCat] = await db
          .insert(categories)
          .values(cat)
          .returning();
        categoryMap.set(cat.slug, newCat.id);
        console.log(`  ✓ Created category "${cat.name}"`);
      }
    }

    console.log('\n📦 Migrating projects...\n');

    const data = projectsData as ProjectsData;
    let totalMigrated = 0;
    let totalSkipped = 0;

    // Step 2: Migrate Featured Projects
    if (data.featuredProjects && data.featuredProjects.length > 0) {
      console.log('🌟 Migrating Featured Projects:');
      const featuredCategoryId = categoryMap.get('featured');

      for (const project of data.featuredProjects) {
        const existing = await db
          .select()
          .from(projects)
          .where(eq(projects.title, project.title))
          .limit(1);

        if (existing.length > 0) {
          console.log(`  ⊘ Skipped: "${project.title}" (already exists)`);
          totalSkipped++;
          continue;
        }

        await db.insert(projects).values({
          title: project.title,
          subtitle: project.subtitle,
          year: project.year,
          sector: project.sector,
          responsibility: project.responsibility,
          impact: project.impact,
          tech: project.tech,
          description: project.description,
          features: project.features || [],
          images: project.images,
          live: project.live || '#',
          github: project.github || '#',
          comingSoon: project.comingSoon || false,
          inProgress: project.inProgress || false,
          categoryId: featuredCategoryId,
          order: totalMigrated,
        });

        console.log(`  ✓ Migrated: "${project.title}"`);
        totalMigrated++;
      }
    }

    // Step 3: Migrate Web Projects
    if (data.webProjects && data.webProjects.length > 0) {
      console.log('\n🌐 Migrating Web Projects:');
      const webCategoryId = categoryMap.get('web');

      for (const project of data.webProjects) {
        const existing = await db
          .select()
          .from(projects)
          .where(eq(projects.title, project.title))
          .limit(1);

        if (existing.length > 0) {
          console.log(`  ⊘ Skipped: "${project.title}" (already exists)`);
          totalSkipped++;
          continue;
        }

        await db.insert(projects).values({
          title: project.title,
          subtitle: project.subtitle,
          year: project.year,
          sector: project.sector,
          responsibility: project.responsibility,
          impact: project.impact,
          tech: project.tech,
          description: project.description,
          features: project.features || [],
          images: project.images,
          live: project.live || '#',
          github: project.github || '#',
          comingSoon: project.comingSoon || false,
          inProgress: project.inProgress || false,
          categoryId: webCategoryId,
          order: totalMigrated,
        });

        console.log(`  ✓ Migrated: "${project.title}"`);
        totalMigrated++;
      }
    }

    // Step 4: Migrate Design Projects (if they exist)
    if (data.designProjects && data.designProjects.length > 0) {
      console.log('\n🎨 Migrating Design Projects:');
      const designCategoryId = categoryMap.get('design');

      for (const project of data.designProjects) {
        const existing = await db
          .select()
          .from(projects)
          .where(eq(projects.title, project.title))
          .limit(1);

        if (existing.length > 0) {
          console.log(`  ⊘ Skipped: "${project.title}" (already exists)`);
          totalSkipped++;
          continue;
        }

        await db.insert(projects).values({
          title: project.title,
          subtitle: project.subtitle,
          year: project.year,
          sector: project.sector,
          responsibility: project.responsibility,
          impact: project.impact,
          tech: project.tech,
          description: project.description,
          features: project.features || [],
          images: project.images,
          live: project.live || '#',
          github: project.github || '#',
          comingSoon: project.comingSoon || false,
          inProgress: project.inProgress || false,
          categoryId: designCategoryId,
          order: totalMigrated,
        });

        console.log(`  ✓ Migrated: "${project.title}"`);
        totalMigrated++;
      }
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('✨ Migration Complete!\n');
    console.log(`📊 Summary:`);
    console.log(`  • Total projects migrated: ${totalMigrated}`);
    console.log(`  • Total projects skipped: ${totalSkipped}`);
    console.log(`  • Categories created: ${categoryMap.size}`);
    console.log('='.repeat(50) + '\n');

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
migrateProjects()
  .then(() => {
    console.log('✅ Migration script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration script failed:', error);
    process.exit(1);
  });