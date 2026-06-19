import { list } from '@vercel/blob';
import fs from 'fs/promises';
import path from 'path';
import { db } from './index';
import { CaseStudy, projects, settings } from './schema';

// Read a JSON data source: prefer Vercel Blob (live prod data) when a token is
// set, otherwise fall back to the bundled seed file under src/data.
async function readSource(
  blobPath: string,
  fileName: string,
): Promise<unknown> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { blobs } = await list({ prefix: blobPath });
    const match = blobs.find((b) => b.pathname === blobPath);
    if (match) {
      const res = await fetch(match.url, { cache: 'no-store' });
      if (res.ok) return JSON.parse(await res.text());
    }
  }
  const filePath = path.join(process.cwd(), 'src/data', fileName);
  return JSON.parse(await fs.readFile(filePath, 'utf8'));
}

interface RawProject {
  id: string;
  slug: string;
  title: string;
  category?: string[];
  description?: string;
  thumbnail?: string;
  color?: string;
  caseStudy?: CaseStudy;
  externalUrl?: string;
}

async function seed() {
  // --- Projects ---
  const rawProjects = (await readSource(
    'data/projects.json',
    'projects.json',
  )) as RawProject[];

  if (Array.isArray(rawProjects)) {
    for (const p of rawProjects) {
      if (!p?.id || !p?.title || !p?.slug) continue;
      await db
        .insert(projects)
        .values({
          id: p.id,
          slug: p.slug,
          title: p.title,
          description: p.description ?? '',
          thumbnail: p.thumbnail ?? '',
          color: p.color ?? '',
          externalUrl: p.externalUrl ?? null,
          category: Array.isArray(p.category) ? p.category : [],
          caseStudy: p.caseStudy ?? null,
          // Preserve ordering: ids are Date.now() timestamps
          createdAt: Number(p.id) || Date.now(),
        })
        .onConflictDoNothing();
    }
    console.log(`Seeded ${rawProjects.length} project(s)`);
  }

  // --- Settings ---
  const rawSettings = (await readSource(
    'data/settings.json',
    'settings.json',
  )) as { email?: string; linkedinUrl?: string };

  await db
    .insert(settings)
    .values({
      id: 1,
      email: rawSettings.email ?? 'putrigriseldac@gmail.com',
      linkedinUrl:
        rawSettings.linkedinUrl ?? 'https://www.linkedin.com/in/griselda-putri/',
    })
    .onConflictDoUpdate({
      target: settings.id,
      set: {
        email: rawSettings.email ?? 'putrigriseldac@gmail.com',
        linkedinUrl:
          rawSettings.linkedinUrl ??
          'https://www.linkedin.com/in/griselda-putri/',
      },
    });
  console.log('Seeded settings');
}

seed()
  .then(() => {
    console.log('Seed complete');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });
