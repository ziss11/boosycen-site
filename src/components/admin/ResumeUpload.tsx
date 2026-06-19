'use client';

import { ChangeEvent, useRef, useState } from 'react';

interface ResumeUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ResumeUpload({
  value,
  onChange,
  label = 'Resume / CV (PDF)',
}: ResumeUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');

    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file');
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      onChange(data.url);
    } catch (err) {
      console.error('Resume upload error:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const fileName = value ? value.split('/').pop() : '';

  return (
    <div className='space-y-3'>
      <label className='block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide'>
        {label}
      </label>

      <input
        ref={fileInputRef}
        type='file'
        accept='application/pdf'
        onChange={handleFileSelect}
        className='hidden'
        disabled={uploading}
      />

      {value ? (
        <div className='flex items-center gap-3 p-3 rounded-lg border border-foreground/10 bg-black/2 dark:bg-white/2'>
          <span className='text-xl shrink-0'>📄</span>
          <a
            href={value}
            target='_blank'
            rel='noopener noreferrer'
            className='flex-1 min-w-0 truncate text-sm text-foreground hover:text-accent transition-colors'
            title={fileName}
          >
            {fileName}
          </a>
          <button
            type='button'
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className='btn btn-secondary px-2.5! py-1.5! text-xs! disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {uploading ? 'Uploading...' : 'Replace'}
          </button>
          <button
            type='button'
            onClick={handleRemove}
            disabled={uploading}
            className='btn border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 dark:border-red-800/40 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors px-2.5! py-1.5! text-xs! disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Remove
          </button>
        </div>
      ) : (
        <button
          type='button'
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className='w-full card p-6 border-2! border-dashed! border-foreground/20 hover:border-foreground/40 transition-colors'
        >
          <div className='text-center space-y-1.5'>
            <div className='text-3xl'>📄</div>
            <p className='text-sm text-muted'>
              {uploading ? 'Uploading...' : 'Click to upload a PDF resume'}
            </p>
            <p className='text-xs text-muted/70'>PDF only (max 10MB)</p>
          </div>
        </button>
      )}

      {error && (
        <p className='text-sm text-red-500 bg-red-50 px-3 py-2 rounded'>
          {error}
        </p>
      )}
    </div>
  );
}
