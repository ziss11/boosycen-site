import { desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { CaseStudy, projects } from '@/db/schema';
import { generateColorGradient } from './color-generator';
import { ensureUniqueSlug, generateSlug } from './slug-utils';

// Define the Project type based on the existing structure
export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string[];
  description: string;
  thumbnail: string;
  color: string;
  caseStudy?: CaseStudy;
  externalUrl?: string;
}

type ProjectRow = typeof projects.$inferSelect;

// Map a DB row to the public Project shape (drop nulls / internal columns)
function rowToProject(row: ProjectRow): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category ?? [],
    description: row.description,
    thumbnail: row.thumbnail,
    color: row.color,
    caseStudy: row.caseStudy ?? undefined,
    externalUrl: row.externalUrl ?? undefined,
  };
}

// Normalize an arbitrary category value into a string[]
function normalizeCategory(category: unknown): string[] {
  if (Array.isArray(category)) return category as string[];
  if (typeof category === 'string') return [category];
  return [];
}

// Service methods
export const projectService = {
  getAll: async (): Promise<Project[]> => {
    // Newest first
    const rows = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt));
    return rows.map(rowToProject);
  },

  getById: async (id: string): Promise<Project | undefined> => {
    const rows = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);
    return rows[0] ? rowToProject(rows[0]) : undefined;
  },

  getBySlug: async (slug: string): Promise<Project | undefined> => {
    const rows = await db
      .select()
      .from(projects)
      .where(eq(projects.slug, slug))
      .limit(1);
    return rows[0] ? rowToProject(rows[0]) : undefined;
  },

  create: async (project: Project): Promise<Project> => {
    const existing = await projectService.getAll();

    const id = project.id || Date.now().toString();
    const baseSlug = generateSlug(project.title || '');
    const slug = ensureUniqueSlug(baseSlug, existing);
    const color =
      project.color || generateColorGradient(project.title || slug || '');

    const row = {
      id,
      slug,
      title: project.title || '',
      description: project.description || '',
      thumbnail: project.thumbnail || '',
      color,
      externalUrl: project.externalUrl || null,
      category: normalizeCategory(project.category),
      caseStudy: project.caseStudy ?? null,
      createdAt: Date.now(),
    };

    await db.insert(projects).values(row);
    return rowToProject(row as ProjectRow);
  },

  update: async (
    id: string,
    updates: Partial<Project>,
  ): Promise<Project | null> => {
    const current = await projectService.getById(id);
    if (!current) return null;

    const merged: Project = { ...current, ...updates };

    // Regenerate slug if title changed
    if (updates.title && updates.title !== current.title) {
      const all = await projectService.getAll();
      const baseSlug = generateSlug(updates.title);
      merged.slug = ensureUniqueSlug(baseSlug, all, id);
    }

    await db
      .update(projects)
      .set({
        slug: merged.slug,
        title: merged.title,
        description: merged.description,
        thumbnail: merged.thumbnail,
        color: merged.color,
        externalUrl: merged.externalUrl ?? null,
        category: normalizeCategory(merged.category),
        caseStudy: merged.caseStudy ?? null,
      })
      .where(eq(projects.id, id));

    // Revalidate affected routes
    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath(`/projects/${merged.slug}`);

    return merged;
  },

  delete: async (id: string): Promise<boolean> => {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return result.rowsAffected > 0;
  },
};
