import { list, put } from '@vercel/blob';
import fs from 'fs/promises';
import path from 'path';

// Site-wide contact settings, editable from the admin panel
export interface Settings {
  email: string;
  linkedinUrl: string;
}

// Defaults double as a safety net when a field is missing from the stored data
export const DEFAULT_SETTINGS: Settings = {
  email: 'putrigriseldac@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/griselda-putri/',
};

const dataFilePath = path.join(process.cwd(), 'src/data/settings.json');
// Stable pathname for the settings blob on Vercel Blob
const DATA_BLOB_PATH = 'data/settings.json';

// Parse + merge raw JSON with defaults so missing fields stay safe
function parseSettings(data: string): Settings {
  try {
    const parsed = JSON.parse(data);
    if (typeof parsed !== 'object' || parsed === null) {
      return { ...DEFAULT_SETTINGS };
    }
    return {
      email:
        typeof parsed.email === 'string' && parsed.email
          ? parsed.email
          : DEFAULT_SETTINGS.email,
      linkedinUrl:
        typeof parsed.linkedinUrl === 'string' && parsed.linkedinUrl
          ? parsed.linkedinUrl
          : DEFAULT_SETTINGS.linkedinUrl,
    };
  } catch (error) {
    console.error('Error parsing settings:', error);
    return { ...DEFAULT_SETTINGS };
  }
}

// Helper to read settings
async function readSettings(): Promise<Settings> {
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Production (Vercel): read from Vercel Blob
      const { blobs } = await list({ prefix: DATA_BLOB_PATH });
      const match = blobs.find((b) => b.pathname === DATA_BLOB_PATH);

      if (match) {
        const res = await fetch(match.url, { cache: 'no-store' });
        if (res.ok) {
          return parseSettings(await res.text());
        }
        console.error('Failed to fetch settings blob:', res.status);
      }

      // Blob not seeded yet (first deploy): fall back to bundled file (read-only)
      const seed = await fs.readFile(dataFilePath, 'utf8');
      return parseSettings(seed);
    }

    // Local dev: read from filesystem
    const data = await fs.readFile(dataFilePath, 'utf8');
    return parseSettings(data);
  } catch (error) {
    console.error('Error reading settings:', error);
    return { ...DEFAULT_SETTINGS };
  }
}

// Helper to write settings
async function writeSettings(settings: Settings): Promise<void> {
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Production (Vercel): filesystem is read-only, write to Vercel Blob
      await put(DATA_BLOB_PATH, JSON.stringify(settings, null, 2), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      return;
    }

    // Local dev: write to filesystem
    await fs.writeFile(dataFilePath, JSON.stringify(settings, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing settings:', error);
    throw new Error('Failed to save settings');
  }
}

// Service methods
export const settingsService = {
  get: async (): Promise<Settings> => {
    return await readSettings();
  },

  update: async (updates: Partial<Settings>): Promise<Settings> => {
    const current = await readSettings();
    const next = parseSettings(JSON.stringify({ ...current, ...updates }));
    await writeSettings(next);
    return next;
  },
};
