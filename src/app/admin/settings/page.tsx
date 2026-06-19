import ThemeToggle from '@/components/ui/ThemeToggle';
import SettingsForm from '@/components/admin/SettingsForm';
import { settingsService } from '@/lib/settings-service';
import Link from 'next/link';
import { updateSettings } from '../actions';

// Settings live in Vercel Blob (mutable via admin), so always read fresh
export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const settings = await settingsService.get();

  return (
    <div className='min-h-screen bg-bg-subtle px-4 py-8 md:px-8'>
      <div className='max-w-2xl mx-auto'>
        <div className='mb-8 animate-fade-in-up flex items-start justify-between'>
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <Link
                href='/admin'
                className='text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1'
              >
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  aria-hidden='true'
                >
                  <path
                    d='M19 12H5M5 12l7-7M5 12l7 7'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                Back
              </Link>
            </div>
            <h1 className='heading-lg text-foreground flex items-center gap-3'>
              <span className='text-4xl'>⚙️</span>
              Site Settings
            </h1>
            <p className='mt-2 text-sm text-muted'>
              Update your contact email and LinkedIn URL
            </p>
          </div>
          <ThemeToggle className='text-muted mt-1' />
        </div>
        <SettingsForm initialData={settings} action={updateSettings} />
      </div>
    </div>
  );
}
