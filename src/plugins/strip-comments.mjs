/**
 * Removes HTML comments, such as `<!-- TODO: ... -->`, from Markdown so notes
 * to yourself never reach the published page or its source code.
 *
 * @returns {import('satteri').MdastPluginDefinition}
 */
export default function stripComments() {
  return {
    name: 'strip-comments',
    /** @param {{ value: string }} node @param {any} ctx */
    html(node, ctx) {
      if (/^\s*<!--[\s\S]*-->\s*$/.test(node.value)) ctx.removeNode(node);
    },
  };
}
