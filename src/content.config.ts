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

/** content/settings.md: your name, email, and links, used across the whole site. */
const settings = defineCollection({
  loader: glob({ pattern: 'settings.md', base: './content' }),
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

/** content/pages/*.md: the Home, Work Samples, About, Résumé, and Contact pages. */
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      // Home page
      headline: z.string().optional(),
      // Work Samples page
      categories: z
        .array(z.object({ name: z.string(), description: z.string() }))
        .optional(),
      // About page
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

export const collections = { settings, pages, work };
