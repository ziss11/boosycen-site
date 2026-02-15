import { writeFile, mkdir } from 'fs/promises';
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
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
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

    // Ensure the projects directory exists
    const projectsDir = path.join(process.cwd(), 'public', 'projects');
    try {
      await mkdir(projectsDir, { recursive: true });
    } catch (err) {
      // Directory might already exist, which is fine
      console.log('Projects directory already exists or created');
    }

    // Save to public/projects directory
    const uploadPath = path.join(projectsDir, filename);
    await writeFile(uploadPath, buffer);

    // Return the public URL path
    const publicUrl = `/projects/${filename}`;

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
      { error: 'Failed to upload file' },
      { status: 500 },
    );
  }
}
