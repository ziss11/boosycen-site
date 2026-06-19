import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export interface CaseStudy {
  overview: string;
  problem: string;
  solution: string;
  process: string[];
  results: string[];
}

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull().default(''),
  thumbnail: text('thumbnail').notNull().default(''),
  color: text('color').notNull().default(''),
  externalUrl: text('external_url'),
  category: text('category', { mode: 'json' })
    .$type<string[]>()
    .notNull()
    .default([]),
  caseStudy: text('case_study', { mode: 'json' }).$type<CaseStudy>(),
  createdAt: integer('created_at').notNull(),
});

export const settings = sqliteTable('settings', {
  id: integer('id').primaryKey(),
  email: text('email').notNull(),
  linkedinUrl: text('linkedin_url').notNull(),
  resumeUrl: text('resume_url').notNull().default(''),
});
