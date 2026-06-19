import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { settings } from '@/db/schema';

// Site-wide contact settings, editable from the admin panel
export interface Settings {
  email: string;
  linkedinUrl: string;
}

// Defaults double as a safety net when the row is missing
export const DEFAULT_SETTINGS: Settings = {
  email: 'putrigriseldac@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/griselda-putri/',
};

// Single-row settings table keyed by id = 1
const SETTINGS_ID = 1;

// Service methods
export const settingsService = {
  get: async (): Promise<Settings> => {
    const rows = await db
      .select()
      .from(settings)
      .where(eq(settings.id, SETTINGS_ID))
      .limit(1);
    const row = rows[0];
    if (!row) return { ...DEFAULT_SETTINGS };
    return {
      email: row.email || DEFAULT_SETTINGS.email,
      linkedinUrl: row.linkedinUrl || DEFAULT_SETTINGS.linkedinUrl,
    };
  },

  update: async (updates: Partial<Settings>): Promise<Settings> => {
    const current = await settingsService.get();
    const next: Settings = { ...current, ...updates };

    await db
      .insert(settings)
      .values({ id: SETTINGS_ID, ...next })
      .onConflictDoUpdate({
        target: settings.id,
        set: { email: next.email, linkedinUrl: next.linkedinUrl },
      });

    return next;
  },
};
