/**
 * Helpers that load content from the `content/` folder and check it for
 * common mistakes. Error messages here are written for the person editing
 * the Markdown files, so they say exactly which file to fix.
 */
import fs from 'node:fs';
import path from 'node:path';
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type WorkSample = CollectionEntry<'work'>;
export type Page = CollectionEntry<'pages'>;

/** Builds a link that works no matter what folder the site is published in. */
export function url(href = '/'): string {
  if (/^([a-z]+:|#|\/\/)/i.test(href)) return href;
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return `${base}/${href.replace(/^\/+/, '')}`;
}

/** Removes the underscores used to mark script words, e.g. "About _me_" -> "About me". */
export function plainText(text: string): string {
  return text.replace(/_([^_]+)_/g, '$1');
}

/** Turns "Docs as Code" into "docs-as-code" for use in links. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatDate(date: Date, style: 'month' | 'day' = 'month'): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    ...(style === 'day' ? { day: 'numeric' } : {}),
    timeZone: 'UTC',
  });
}

/** Checks that a file path like "/files/resume.pdf" exists in the `public/` folder. */
function assertPublicFile(filePath: string, usedIn: string) {
  const onDisk = path.join(process.cwd(), 'public', filePath.replace(/^\/+/, ''));
  if (!fs.existsSync(onDisk)) {
    throw new Error(
      `${usedIn} links to "${filePath}", but there is no file at public/${filePath.replace(/^\/+/, '')}. ` +
        'Check the spelling, or add the file to that folder.',
    );
  }
}

export async function getSettings() {
  const [entry] = await getCollection('settings');
  if (!entry) throw new Error('Missing content/settings.md. This file holds your name and contact details.');
  return entry.data;
}

const homeFiles = {
  homeIntro: 'intro',
  homeStats: 'stats',
  homeFeatured: 'featured',
  homeCapabilities: 'capabilities',
  homeTools: 'tools',
  homeProcess: 'process',
  homeClosing: 'closing',
} as const;

/** One section of the home page, from its file in content/home/. */
export async function getHomeSection<C extends keyof typeof homeFiles>(
  collection: C,
): Promise<CollectionEntry<C>> {
  const [entry] = await getCollection(collection);
  if (!entry) throw new Error(`Missing content/home/${homeFiles[collection]}.md.`);
  return entry;
}

export async function getPage(id: 'work' | 'about' | 'resume' | 'contact'): Promise<Page> {
  const page = await getEntry('pages', id);
  if (!page) throw new Error(`Missing content/pages/${id}.md.`);
  if (page.data.pdf) assertPublicFile(page.data.pdf, `content/pages/${id}.md`);
  return page;
}

/**
 * The categories listed in content/pages/work.md, in order. Categories marked
 * `hidden: true` are left out unless `includeHidden` is set.
 */
export async function getCategories({ includeHidden = false } = {}) {
  const page = await getPage('work');
  const categories = page.data.categories ?? [];
  if (categories.length === 0) {
    throw new Error('content/pages/work.md needs a "categories" list.');
  }
  return categories
    .filter((category) => includeHidden || !category.hidden)
    .map((category) => ({ ...category, slug: slugify(category.name) }));
}

/**
 * All published work samples, newest first. Samples marked `draft: true`, and
 * samples in a category marked `hidden: true`, are left out.
 */
export async function getWorkSamples(): Promise<WorkSample[]> {
  const categories = await getCategories({ includeHidden: true });
  const names = categories.map((category) => category.name);
  const hidden = categories.filter((category) => category.hidden).map((category) => category.name);
  const samples = await getCollection('work', (entry) => !entry.data.draft);

  for (const sample of samples) {
    const file = `content/work/${sample.id}.md`;
    if (!names.includes(sample.data.category)) {
      throw new Error(
        `${file} has category "${sample.data.category}", which is not in the list in content/pages/work.md. ` +
          `Use one of: ${names.join(', ')}.`,
      );
    }
    if (sample.data.pdf) assertPublicFile(sample.data.pdf, file);
  }

  return samples
    .filter((sample) => !hidden.includes(sample.data.category))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function categoryHref(category: string): string {
  return url(`/work/#${slugify(category)}`);
}
