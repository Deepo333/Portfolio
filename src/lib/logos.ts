/**
 * Real tool logos from Simple Icons (https://simpleicons.org, free to use).
 * In content/home/tools.md, a tool's `logo:` is the logo's Simple Icons name,
 * for example `logo: jira`. A tool without a logo shows its name in a text tile.
 */
import * as simpleIcons from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';

const bySlug = new Map<string, SimpleIcon>(
  Object.values(simpleIcons)
    .filter((icon): icon is SimpleIcon => typeof icon === 'object' && icon !== null && 'slug' in icon)
    .map((icon) => [icon.slug, icon]),
);

/** Looks up logos by name, and stops the build with a helpful message if one doesn't exist. */
export function getLogos(names: string | string[] | undefined, tool: string): SimpleIcon[] {
  const list = names === undefined ? [] : Array.isArray(names) ? names : [names];
  return list.map((name) => {
    const icon = bySlug.get(name);
    if (!icon) {
      throw new Error(
        `content/home/tools.md gives ${tool} the logo "${name}", but Simple Icons has no logo with that name. ` +
          'Search for the tool at https://simpleicons.org and use the name shown in its address, ' +
          'or delete the logo line to show the tool as a text tile.',
      );
    }
    return icon;
  });
}
