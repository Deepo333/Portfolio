// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import basePathLinks from './src/plugins/base-path-links.mjs';
import stripComments from './src/plugins/strip-comments.mjs';

// When the site is built by GitHub Actions, these two values are filled in
// automatically from your GitHub Pages settings (see .github/workflows/deploy.yml).
// When you run the site on your own computer, the defaults below are used.
const site = process.env.SITE_URL || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  markdown: {
    // basePathLinks lets you write links like [Résumé](/resume/) in Markdown and
    // have them work no matter what address the site is published at.
    // stripComments keeps <!-- notes --> in Markdown off the published site.
    processor: satteri({ mdastPlugins: [basePathLinks(base), stripComments()] }),
  },
});
