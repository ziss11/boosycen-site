import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

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
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const originalName = file.name.replace(/\s/g, '-');
    const filename = `${timestamp}-${originalName}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/projects directory
    const uploadPath = path.join(process.cwd(), 'public/projects', filename);
    await writeFile(uploadPath, buffer);

    // Return the public URL path
    const publicUrl = `/projects/${filename}`;

    return NextResponse.json(
      {
        success: true,
        url: publicUrl,
        filename,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
