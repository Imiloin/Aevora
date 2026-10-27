# Custom Markdown Plugins

Aevora's local plugins extend Satteri through Markdown AST visitors. They are registered in [astro.config.mjs](../astro.config.mjs), with bare text directive handling before citations. See the [Markdown Extensions example](../src/content/blog/examples/markdown-extensions.md) for source and rendered results.

## Bare Text Directives

[bare-text-directives.ts](../src/plugins/bare-text-directives.ts) prevents ordinary colon text, such as `2:1`, `12:30`, and `localhost:4321`, from being consumed as directives.

The plugin restores bare `:name` nodes to text. It uses Satteri's source positions to distinguish them from explicit `:name[]` or `:name{}`, whose parsed children and attributes may also be empty. Inline directives with brackets or braces, including empty pairs, and all leaf (`::`) and container (`:::`) directives retain their default behavior.

## Citations

[citations.ts](../src/plugins/citations.ts) generates numbered citation links and a reference list from the same ordered bibliography records, keeping their numbering consistent.

It reads `bibliography` from article frontmatter, resolving the path relative to the Markdown file. BibTeX keys are case-sensitive and support letters, digits, hyphens, and underscores. Unknown keys or a missing bibliography produce an error.

```markdown
A citation :cite[vaswani2017attention].
A passage :cite[vaswani2017attention]{locator="Section 3"}.

::nocite[*]
```

Each article has its own numbering map. `textDirective` visitors assign numbers in first-citation order, reusing them for repeated citations. `::nocite[*]` requests the entire bibliography. The `after` hook appends uncited entries in BibTeX order, then creates the `References` heading and list. This makes the directive's position irrelevant to numbering and lets Astro include the heading in the table of contents.

[bibliography.ts](../src/utils/bibliography.ts) uses Citation.js to parse BibTeX and format entries with [biblatex-numeric.csl](../src/csl/biblatex-numeric.csl). The style approximates biblatex numeric with full given-family names, plain paper titles, italic book and venue titles, and DOI/URL links. Four or more authors become the first three plus `et al.`. Thesis and report genre names are normalized before formatting. arXiv's exported BibTeX retains its URL, without separately displaying `eprint`, `archivePrefix`, or `primaryClass`.

Formatting is synchronous because Citation.js shares a CSL engine per style. The content loader's `deferRender: true` ensures each build reads updated `.bib` files. Development does not watch these files, so save the referring Markdown file or restart the server after editing a bibliography. Restart after changing the CSL.

## MathJax

[mathjax.ts](../src/plugins/mathjax.ts) renders inline and display TeX to SVG during Markdown processing using the official MathJax packages. The resulting page needs no browser-side math renderer.

The plugin creates a MathJax document on the first formula in each article, isolating macros, equation state, and SVG IDs between posts. Its `inlineMath` and `math` visitors render formulas, and its `after` hook appends the required stylesheet only when math is present.

The original TeX font includes all glyph data, allowing synchronous rendering. [mathjax-tex-packages.ts](../src/plugins/mathjax-tex-packages.ts) is a supporting module that explicitly imports and enables TeX extensions for the direct MathJax API.

Display formulas use `displayOverflow: 'scroll'` to contain long expressions, while inline formulas stay unbroken. [prose.css](../src/styles/prose.css) aligns formula scrollbars with code blocks, and [print.css](../src/styles/print.css) scales display SVGs to the printable width.
