import { pgTable, uuid, text, varchar, boolean, integer, timestamp } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
  order: integer('order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  subtitle: text('subtitle').notNull(),
  year: varchar('year', { length: 4 }).notNull(),
  sector: varchar('sector', { length: 100 }).notNull(),
  responsibility: text('responsibility'),
  impact: text('impact'),
  tech: text('tech').array().notNull(),
  description: text('description').notNull(),
  features: text('features').array(),
  images: text('images').array().notNull(),
  live: varchar('live', { length: 500 }).default('#'),
  github: varchar('github', { length: 500 }).default('#'),
  comingSoon: boolean('coming_soon').default(false),
  inProgress: boolean('in_progress').default(false),
  categoryId: uuid('category_id').references(() => categories.id),
  order: integer('order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;