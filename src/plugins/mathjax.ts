import { MathJaxTexFont } from '@mathjax/mathjax-tex-font/js/svg.js';
import { liteAdaptor } from '@mathjax/src/js/adaptors/liteAdaptor.js';
import type { LiteElement } from '@mathjax/src/js/adaptors/lite/Element.js';
import { RegisterHTMLHandler } from '@mathjax/src/js/handlers/html.js';
import { TeX } from '@mathjax/src/js/input/tex.js';
import { mathjax as engine } from '@mathjax/src/js/mathjax.js';
import { SVG } from '@mathjax/src/js/output/svg.js';
import { defineMdastPlugin } from 'satteri';

import { texPackages } from '@plugins/mathjax-tex-packages';

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

export function mathjax() {
  // A fresh document isolates TeX macros, equation state and SVG IDs per article.
  let document: ReturnType<typeof engine.document> | undefined;
  // The original TeX font includes all glyph data, so conversion stays synchronous.
  const output = new SVG({
    fontCache: 'local',
    fontData: MathJaxTexFont,
    displayOverflow: 'scroll',
    linebreaks: { inline: false },
  });

  function render(source: string, display: boolean) {
    document ??= engine.document('', {
      InputJax: new TeX({ packages: texPackages }),
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
