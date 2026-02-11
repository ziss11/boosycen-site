import fs from 'fs/promises';
import path from 'path';
import { generateColorGradient } from './color-generator';

// Define the Project type based on the existing structure
export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string[];
  description: string;
  thumbnail: string;
  color: string;
  tags: string[];
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

// Helper to read projects
async function readProjects(): Promise<Project[]> {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

// Helper to write projects
async function writeProjects(projects: Project[]): Promise<void> {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing projects:', error);
    throw new Error('Failed to save project data');
  }
}

// Service methods
export const projectService = {
  getAll: async (): Promise<Project[]> => {
    return await readProjects();
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

    // Auto-generate color if not provided
    if (!project.color) {
      project.color = generateColorGradient(project.slug || project.title);
    }

    // Ensure category is array
    if (!Array.isArray(project.category)) {
      project.category = [project.category as unknown as string];
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
    projects[index] = updatedProject;
    await writeProjects(projects);
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
