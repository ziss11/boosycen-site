'use server';

import { Project, projectService } from '@/lib/project-service';
import { revalidatePath } from 'next/cache';

export async function deleteProject(id: string) {
  try {
    const success = await projectService.delete(id);
    if (success) {
      revalidatePath('/admin');
      revalidatePath('/'); // Revalidate home page
      revalidatePath('/projects'); // Revalidate projects list if any
      return { success: true };
    }
    return { success: false, message: 'Project not found' };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { success: false, message: 'Failed to delete project' };
  }
}

export async function createProject(data: Partial<Project>) {
  try {
    // Cast to Project since we know we'll handle missing ID in service
    const project = await projectService.create(data as Project);
    revalidatePath('/admin');
    revalidatePath('/');
    revalidatePath('/projects');
    return { success: true, project };
  } catch (error) {
    console.error('Error creating project:', error);
    return { success: false, message: 'Failed to create project' };
  }
}

export async function updateProject(id: string, data: Partial<Project>) {
  try {
    const project = await projectService.update(id, data);
    if (project) {
      revalidatePath('/admin');
      revalidatePath('/');
      revalidatePath('/projects');
      revalidatePath(`/admin/projects/${id}`);
      return { success: true, project };
    }
    return { success: false, message: 'Project not found' };
  } catch (error) {
    console.error('Error updating project:', error);
    return { success: false, message: 'Failed to update project' };
  }
}
