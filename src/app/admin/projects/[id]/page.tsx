import ProjectForm from '@/components/admin/ProjectForm';
import { Project, projectService } from '@/lib/project-service';
import { notFound } from 'next/navigation';
import { updateProject } from '../../actions';

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await projectService.getById(id);

  if (!project) {
    notFound();
  }

  const updateAction = async (data: Partial<Project>) => {
    'use server';
    return updateProject(id, data);
  };

  return (
    <div className='min-h-screen gradient-mesh p-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-8 animate-fade-in-up'>
          <h1 className='heading-lg text-foreground flex items-center gap-3'>
            <span className='text-4xl'>✏️</span>
            Edit Project
          </h1>
          <p className='mt-2 text-sm text-muted'>
            {project.title}
          </p>
        </div>
        <ProjectForm
          initialData={project}
          action={updateAction}
        />
      </div>
    </div>
  );
}
