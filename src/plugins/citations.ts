import type { CSL } from '@citation-js/core';
import type { PhrasingContent } from 'mdast';
import { defineMdastPlugin, type MdastVisitorContext } from 'satteri';
import { formatBibliography, readBibliography } from '../utils/bibliography.ts';

function citationError(ctx: MdastVisitorContext, message: string): never {
  throw new Error(`${ctx.fileURL?.pathname ?? 'Markdown'}: ${message}`);
}

export function citations() {
  // Factories run once per document, so numbering never leaks between articles.
  let bibliography: Map<string, CSL> | undefined;
  const cited = new Map<string, { number: number; entry: CSL }>();

  return defineMdastPlugin({
    name: 'aevora-citations',
    textDirective(node, ctx) {
      if (node.name !== 'cite') return;

      const keys = [
        ...new Set(
          ctx
            .textContent(node)
            .split(';')
            .map((key) => key.trim())
        ),
      ];
      if (
        node.children.some((child) => child.type !== 'text') ||
        keys.some((key) => !/^[A-Za-z0-9_-]+$/.test(key))
      ) {
        citationError(ctx, 'Use :cite[key] or :cite[key1; key2] with letters, digits, - and _.');
      }

      if (!bibliography) {
        const path = ctx.data.astro?.frontmatter?.bibliography;
        if (typeof path !== 'string' || !ctx.fileURL) {
          citationError(ctx, 'Citations require a bibliography path in the article frontmatter.');
        }
        bibliography = readBibliography(new URL(path, ctx.fileURL));
      }

      for (const key of keys) {
        const entry = bibliography.get(key);
        if (!entry) citationError(ctx, `Unknown bibliography key "${key}".`);
        if (!cited.has(key)) cited.set(key, { number: cited.size + 1, entry });
      }

      // Sort keys and labels together, rather than attaching links to formatted digits.
      keys.sort((a, b) => cited.get(a)!.number - cited.get(b)!.number);
      const children: PhrasingContent[] = [{ type: 'text', value: '[' }];
      keys.forEach((key, index) => {
        if (index) children.push({ type: 'text', value: ', ' });
        children.push({
          type: 'link',
          url: `#bib-${key}`,
          data: { hProperties: { className: ['citation-link'], role: 'doc-biblioref' } },
          children: [{ type: 'text', value: String(cited.get(key)!.number) }],
        });
      });
      const locator = node.attributes?.locator?.trim();
      children.push({ type: 'text', value: locator ? `, ${locator}]` : ']' });
      ctx.replaceNode(node, children);
    },
    after(root, ctx) {
      if (!cited.size) return;

      const entries = formatBibliography([...cited.values()].map(({ entry }) => entry));
      const html = entries
        .map(([key, entry]) =>
          entry.replace('class="csl-entry"', `class="csl-entry" id="bib-${key}"`)
        )
        .join('\n');
      ctx.appendChild(root, [
        { type: 'heading', depth: 2, children: [{ type: 'text', value: 'References' }] },
        {
          type: 'html',
          value: `<div class="references csl-bib-body" role="doc-bibliography">\n${html}\n</div>`,
        },
      ]);
    },
  });
}
