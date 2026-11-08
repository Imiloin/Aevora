import { MathJaxNewcmFont } from '@mathjax/mathjax-newcm-font/js/svg.js';
import { MathJaxTexFont } from '@mathjax/mathjax-tex-font/js/svg.js';
import { liteAdaptor } from '@mathjax/src/js/adaptors/liteAdaptor.js';
import type { LiteElement } from '@mathjax/src/js/adaptors/lite/Element.js';
import { RegisterHTMLHandler } from '@mathjax/src/js/handlers/html.js';
import { TeX } from '@mathjax/src/js/input/tex.js';
import { mathjax as engine } from '@mathjax/src/js/mathjax.js';
import { SVG } from '@mathjax/src/js/output/svg.js';
import type { SvgCharMap } from '@mathjax/src/js/output/svg/FontData.js';
import '@mathjax/src/js/util/asyncLoad/esm.js';
import { defineMdastPlugin } from 'satteri';

import { texPackages } from '@plugins/mathjax-tex-packages';

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

const font = new MathJaxTexFont();
let fontReady: Promise<void> | undefined;

async function loadSupplementalGlyphs() {
  const supplementalFont = new MathJaxNewcmFont();
  await engine.handleRetriesFor(() => {
    const additions: SvgCharMap = {};
    for (const [start, end] of [
      [0x1d552, 0x1d56b], // Mathematical double-struck lowercase letters a-z.
      [0x1d7d8, 0x1d7e1], // Mathematical double-struck digits 0-9.
    ]) {
      for (let codePoint = start; codePoint <= end; codePoint++) {
        if (font.getChar('normal', codePoint)) continue;
        const glyph = supplementalFont.getChar('normal', codePoint);
        if (!Array.isArray(glyph) || !glyph[3]?.p) {
          throw new Error(`Missing NewCM SVG glyph U+${codePoint.toString(16).toUpperCase()}`);
        }
        additions[codePoint] = glyph;
      }
    }
    font.defineChars('normal', additions);
  });
}

export function mathjax() {
  // A fresh document isolates TeX macros, equation state and SVG IDs per article.
  let document: ReturnType<typeof engine.document> | undefined;
  const output = new SVG({
    fontCache: 'local',
    fontData: font,
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
    async before() {
      await (fontReady ??= loadSupplementalGlyphs());
    },
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
