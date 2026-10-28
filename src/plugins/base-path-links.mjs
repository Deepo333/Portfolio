/**
 * Adds the site's base path (for example "/portfolio") to root-relative links
 * and images written in Markdown, so `[Résumé](/resume/)` keeps working when the
 * site is published in a subfolder on GitHub Pages.
 *
 * @param {string} base The site's base path from astro.config.mjs.
 * @returns {import('satteri').MdastPluginDefinition}
 */
export default function basePathLinks(base = '/') {
  const prefix = base.replace(/\/+$/, '');

  /** @param {{ url: string }} node @param {any} ctx */
  function fix(node, ctx) {
    const { url } = node;
    const isRootRelative = url.startsWith('/') && !url.startsWith('//');
    if (prefix && isRootRelative && url !== prefix && !url.startsWith(`${prefix}/`)) {
      ctx.setProperty(node, 'url', `${prefix}${url}`);
    }
  }

  return { name: 'base-path-links', link: fix, image: fix, definition: fix };
}
