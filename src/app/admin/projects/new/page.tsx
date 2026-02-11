import ProjectForm from '@/components/admin/ProjectForm';
import { createProject } from '../../actions';

export default function NewProjectPage() {
  return (
    <div className='min-h-screen gradient-mesh p-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-8 animate-fade-in-up'>
          <h1 className='heading-lg text-foreground flex items-center gap-3'>
            <span className='text-4xl'>✨</span>
            Add New Project
          </h1>
          <p className='mt-2 text-sm text-muted'>
            Fill in the details to create a new portfolio project
          </p>
        </div>
        <ProjectForm action={createProject} />
      </div>
    </div>
  );
}
