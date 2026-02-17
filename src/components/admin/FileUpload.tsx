'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function FileUpload({
  value,
  onChange,
  label = 'Upload Image',
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(value);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset error
    setError('');

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size must be less than 5MB');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setPreview(reader.result as string);
      } else {
        setError('Failed to read file preview');
      }
    };
    reader.onerror = () => {
      setError('Failed to read file');
      setPreview(value); // Revert to original
    };
    reader.readAsDataURL(file);

    // Upload file
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

      // Update parent component with the URL
      onChange(data.url);
      setPreview(data.url);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload file');
      setPreview(value); // Revert to original value on error
    } finally {
      setUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground">
        {label}
      </label>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      {/* Preview or upload button */}
      {preview ? (
        <div className="space-y-3">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-foreground/10">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleButtonClick}
              disabled={uploading}
              className="btn btn-secondary btn-sm flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Change Image'}
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={uploading}
              className="btn btn-sm border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 dark:border-red-800/40 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={uploading}
          className="w-full card p-8 border-2! border-dashed! border-foreground/20 hover:border-foreground/40 transition-colors"
        >
          <div className="text-center space-y-2">
            <div className="text-4xl">📁</div>
            <p className="text-sm text-muted">
              {uploading ? 'Uploading...' : 'Click to upload an image'}
            </p>
            <p className="text-xs text-muted/70">
              JPEG, PNG, GIF, or WebP (max 5MB)
            </p>
          </div>
        </button>
      )}

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded">
          {error}
        </p>
      )}

      {/* Loading indicator */}
      {uploading && (
        <div className="flex items-center gap-2 text-sm text-muted">
          <div className="w-4 h-4 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
          <span>Uploading...</span>
        </div>
      )}
    </div>
  );
}
