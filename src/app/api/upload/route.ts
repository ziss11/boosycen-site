import { put } from '@vercel/blob';
import { mkdir, writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

// Configure route to handle larger file uploads
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Maximum file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed image MIME types
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    // Validate file exists and is a File object
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'No file provided or invalid file type' },
        { status: 400 },
      );
    }

    // Validate filename for path traversal
    if (
      file.name.includes('..') ||
      file.name.includes('/') ||
      file.name.includes('\\')
    ) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 },
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 },
      );
    }

    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const originalName = file.name.replace(/\s/g, '-');
    const filename = `${timestamp}-${originalName}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let publicUrl: string;

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Production (Vercel): filesystem is read-only, upload to Vercel Blob
      const blob = await put(`projects/${filename}`, buffer, {
        access: 'public',
        contentType: file.type,
      });
      publicUrl = blob.url;
    } else {
      // Local dev: write to public/projects directory
      const projectsDir = path.join(process.cwd(), 'public', 'projects');
      try {
        await mkdir(projectsDir, { recursive: true });
      } catch {
        // Directory might already exist, which is fine
      }

      const uploadPath = path.join(projectsDir, filename);
      await writeFile(uploadPath, buffer);
      publicUrl = `/projects/${filename}`;
    }

    return NextResponse.json(
      {
        success: true,
        url: publicUrl,
        filename,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        error: 'Failed to upload file',
        details: error instanceof Error ? error.message : String(error),
        hasBlobToken: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      },
      { status: 500 },
    );
  }
}
