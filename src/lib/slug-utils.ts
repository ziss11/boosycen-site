import { Project } from './project-service';

/**
 * Converts a title to a URL-friendly slug
 * Examples:
 * "My Project Title" → "my-project-title"
 * "FinTech App 2.0" → "fintech-app-20"
 * "E-Commerce & More!" → "e-commerce-more"
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, '-')
    // Remove special characters except hyphens
    .replace(/[^\w\-]+/g, '')
    // Replace multiple hyphens with single hyphen
    .replace(/\-\-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
}

/**
 * Ensures slug uniqueness by checking existing projects
 * If duplicate exists, appends -2, -3, etc.
 */
export function ensureUniqueSlug(
  baseSlug: string,
  existingProjects: Project[],
  currentProjectId?: string
): string {
  let slug = baseSlug;
  let counter = 2;

  while (
    existingProjects.some(
      p => p.slug === slug && p.id !== currentProjectId
    )
  ) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
