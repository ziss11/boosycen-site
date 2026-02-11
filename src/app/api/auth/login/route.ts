/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    // Simple hardcoded password for demonstration as requested
    // In production, this should be in an environment variable
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'sayang788';

    if (password === ADMIN_PASSWORD) {
      // Set a cookie to indicate the user is logged in
      const cookieStore = await cookies();
      cookieStore.set('admin_token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid password' },
        { status: 401 },
      );
    }
  } catch (_) {
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 },
    );
  }
}
