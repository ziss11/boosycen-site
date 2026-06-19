import { list, put } from '@vercel/blob';
import fs from 'fs/promises';
import path from 'path';
import { generateColorGradient } from './color-generator';
import { generateSlug, ensureUniqueSlug } from './slug-utils';
import { revalidatePath } from 'next/cache';

// Define the Project type based on the existing structure
export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string[];
  description: string;
  thumbnail: string;
  color: string;
  caseStudy?: {
    overview: string;
    problem: string;
    solution: string;
    process: string[];
    results: string[];
  };
  externalUrl?: string;
}

const dataFilePath = path.join(process.cwd(), 'src/data/projects.json');
// Stable pathname for the projects data blob on Vercel Blob
const DATA_BLOB_PATH = 'data/projects.json';

// Parse + validate raw JSON into a clean Project[] (shared by both sources)
function parseProjects(data: string): Project[] {
  const parsed = JSON.parse(data);

  // Validate it's an array
  if (!Array.isArray(parsed)) {
    console.error('Projects file is not an array');
    return [];
  }

  // Validate each project has required fields
  const validProjects = parsed.filter((p: unknown) => {
    if (typeof p !== 'object' || p === null) return false;
    const project = p as Partial<Project>;
    return (
      typeof project.id === 'string' &&
      typeof project.title === 'string' &&
      typeof project.slug === 'string'
    );
  });

  if (validProjects.length !== parsed.length) {
    console.warn(`Filtered out ${parsed.length - validProjects.length} invalid projects`);
  }

  return validProjects as Project[];
}

// Helper to read projects
async function readProjects(): Promise<Project[]> {
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Production (Vercel): read from Vercel Blob
      const { blobs } = await list({ prefix: DATA_BLOB_PATH });
      const match = blobs.find((b) => b.pathname === DATA_BLOB_PATH);

      if (match) {
        const res = await fetch(match.url, { cache: 'no-store' });
        if (res.ok) {
          return parseProjects(await res.text());
        }
        console.error('Failed to fetch projects blob:', res.status);
      }

      // Blob not seeded yet (first deploy): fall back to bundled file (read-only)
      const seed = await fs.readFile(dataFilePath, 'utf8');
      return parseProjects(seed);
    }

    // Local dev: read from filesystem
    const data = await fs.readFile(dataFilePath, 'utf8');
    return parseProjects(data);
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

// Helper to write projects
async function writeProjects(projects: Project[]): Promise<void> {
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Production (Vercel): filesystem is read-only, write to Vercel Blob
      await put(DATA_BLOB_PATH, JSON.stringify(projects, null, 2), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      return;
    }

    // Local dev: write to filesystem
    await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing projects:', error);
    throw new Error('Failed to save project data');
  }
}

// Service methods
export const projectService = {
  getAll: async (): Promise<Project[]> => {
    const projects = await readProjects();
    // Newest first: ids are Date.now() timestamps assigned on create
    return [...projects].sort((a, b) => Number(b.id) - Number(a.id));
  },

  getById: async (id: string): Promise<Project | undefined> => {
    const projects = await readProjects();
    return projects.find((p) => p.id === id);
  },

  getBySlug: async (slug: string): Promise<Project | undefined> => {
    const projects = await readProjects();
    return projects.find((p) => p.slug === slug);
  },

  create: async (project: Project): Promise<Project> => {
    const projects = await readProjects();
    // Generate simple ID if not provided or collision (though this is simplistic)
    if (!project.id) {
      project.id = Date.now().toString();
    }

    // Auto-generate slug from title
    const baseSlug = generateSlug(project.title || '');
    project.slug = ensureUniqueSlug(baseSlug, projects);

    // Auto-generate color if not provided
    if (!project.color) {
      project.color = generateColorGradient(project.title || project.slug || '');
    }

    // Ensure category is array
    if (!project.category) {
      project.category = [];
    } else if (!Array.isArray(project.category)) {
      // Handle case where category might be a single string
      project.category = typeof project.category === 'string'
        ? [project.category]
        : [];
    }

    projects.push(project);
    await writeProjects(projects);
    return project;
  },

  update: async (
    id: string,
    updates: Partial<Project>,
  ): Promise<Project | null> => {
    const projects = await readProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updatedProject = { ...projects[index], ...updates };

    // Regenerate slug if title changed
    if (updates.title && updates.title !== projects[index].title) {
      const baseSlug = generateSlug(updates.title);
      updatedProject.slug = ensureUniqueSlug(baseSlug, projects, id);
    }

    projects[index] = updatedProject;
    await writeProjects(projects);

    // Revalidate affected routes
    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath(`/projects/${updatedProject.slug}`);

    return updatedProject;
  },

  delete: async (id: string): Promise<boolean> => {
    const projects = await readProjects();
    const filteredProjects = projects.filter((p) => p.id !== id);
    if (filteredProjects.length === projects.length) return false;

    await writeProjects(filteredProjects);
    return true;
  },
};
