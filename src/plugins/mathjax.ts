import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor.js';
import type { LiteElement } from 'mathjax-full/js/adaptors/lite/Element.js';
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html.js';
import { TeX } from 'mathjax-full/js/input/tex.js';
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages.js';
import { mathjax as engine } from 'mathjax-full/js/mathjax.js';
import { SVG } from 'mathjax-full/js/output/svg.js';
import { defineMdastPlugin } from 'satteri';

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

export function mathjax() {
  // A fresh document isolates TeX macros, equation state and SVG IDs per article.
  let document: ReturnType<typeof engine.document> | undefined;
  const output = new SVG({ fontCache: 'local' });

  function render(source: string, display: boolean) {
    document ??= engine.document('', {
      InputJax: new TeX({ packages: AllPackages }),
      OutputJax: output,
    });
    return {
      type: 'html' as const,
      value: adaptor.outerHTML(document.convert(source, { display })),
    };
  }

  return defineMdastPlugin({
    name: 'aevora-mathjax',
    inlineMath: (node) => render(node.value, false),
    math: (node) => render(node.value, true),
    after(root, ctx) {
      if (!document) return;
      ctx.appendChild(root, {
        type: 'html',
        value: adaptor.outerHTML(output.styleSheet(document) as LiteElement),
      });
    },
  });
}
