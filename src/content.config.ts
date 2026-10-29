/**
 * Content rules for the site.
 *
 * This file describes which fields each Markdown file in the `content/` folder
 * can have. If a required field is missing or misspelled, the build stops and
 * tells you which file to fix, so mistakes never reach the live site.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { iconNames } from './lib/icons';

const icon = z.enum(iconNames);

/** A collection made of one Markdown file. */
function single(file: string, base = './content') {
  return glob({ pattern: file, base });
}

/** content/settings.md: your name, email, and links, used across the whole site. */
const settings = defineCollection({
  loader: single('settings.md'),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    description: z.string(),
    email: z.email(),
    linkedin: z.url(),
    location: z.string().optional(),
    sourceCode: z.url().optional(),
  }),
});

/* ---------- Home page: one file per section, in content/home/ ---------- */

const homeIntro = defineCollection({
  loader: single('intro.md', './content/home'),
  schema: z.object({
    tagline: z.string(),
    description: z.string().optional(),
    primaryButton: z.string(),
    secondaryButton: z.string(),
  }),
});

const homeStats = defineCollection({
  loader: single('stats.md', './content/home'),
  schema: z.object({
    stats: z
      .array(
        z.object({
          value: z.coerce.string(),
          label: z.string(),
          placeholder: z.boolean().default(false),
        }),
      )
      .min(1),
  }),
});

const homeFeatured = defineCollection({
  loader: single('featured.md', './content/home'),
  schema: z.object({
    title: z.string(),
    linkLabel: z.string(),
  }),
});

const homeCapabilities = defineCollection({
  loader: single('capabilities.md', './content/home'),
  schema: z.object({
    title: z.string(),
    items: z.array(z.object({ name: z.string(), icon, description: z.string() })).min(1),
  }),
});

const homeTools = defineCollection({
  loader: single('tools.md', './content/home'),
  schema: z.object({
    title: z.string(),
    groups: z
      .array(
        z.object({
          name: z.string(),
          items: z.array(z.object({ name: z.string(), icon })).min(1),
        }),
      )
      .min(1),
  }),
});

const homeProcess = defineCollection({
  loader: single('process.md', './content/home'),
  schema: z.object({
    title: z.string(),
    steps: z.array(z.object({ name: z.string(), description: z.string() })).min(1),
  }),
});

const homeClosing = defineCollection({
  loader: single('closing.md', './content/home'),
  schema: z.object({
    title: z.string(),
    emailButton: z.string(),
    linkedinButton: z.string(),
  }),
});

/* ---------- Other pages ---------- */

/** content/pages/*.md: the Work Samples, About, Résumé, and Contact pages. */
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      // Work Samples page
      categories: z
        .array(z.object({ name: z.string(), description: z.string() }))
        .optional(),
      // About page
      lead: z.string().optional(),
      headshot: image().optional(),
      headshotAlt: z.string().optional(),
      // Résumé page
      pdf: z.string().optional(),
      updated: z.coerce.date().optional(),
      // Contact page
      availability: z.string().optional(),
    }),
});

/** content/work/*.md: one file per work sample. Files starting with "_" are ignored. */
const work = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      category: z.string(),
      date: z.coerce.date(),
      cover: image(),
      coverAlt: z.string(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      // Marks an example that isn't real work; shows a "Placeholder sample" label.
      placeholder: z.boolean().default(false),
      role: z.string().optional(),
      audience: z.string().optional(),
      tools: z.array(z.string()).default([]),
      pdf: z.string().optional(),
      images: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            caption: z.string().optional(),
          }),
        )
        .default([]),
      link: z.object({ label: z.string(), url: z.url() }).optional(),
    }),
});

export const collections = {
  settings,
  homeIntro,
  homeStats,
  homeFeatured,
  homeCapabilities,
  homeTools,
  homeProcess,
  homeClosing,
  pages,
  work,
};
