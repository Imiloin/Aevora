# Markdown and Citations

Aevora supports tables, footnotes, math, GitHub alerts and emoji, and Expressive Code blocks. See the [Markdown Extensions example](../src/content/blog/examples/markdown-extensions.md) for source and rendered results.

## Citations

Add a bibliography path relative to the article in frontmatter:

```yaml
bibliography: './references.bib'
```

Cite BibTeX keys with `:cite`. Keys are case-sensitive and support letters, digits, hyphens, and underscores.

```markdown
One paper :cite[vaswani2017attention].
Several papers :cite[vaswani2017attention; another_paper-2020].
A passage :cite[vaswani2017attention]{locator="pp. 3-4"}.
```

- Numbers follow first appearance. Repeated citations reuse their number, and groups display unique numbers in ascending order.
- `locator` adds literal text inside the brackets and applies to the whole group.
- The `References` heading and list are generated automatically from cited entries. Unknown keys or a missing bibliography produce an error.
- Citation syntax stays literal inside inline and fenced code.

arXiv's exported `@misc` BibTeX works directly, including its URL. Separate `eprint`, `archivePrefix`, and `primaryClass` information is not displayed. See the [sample bibliography](../src/content/blog/examples/markdown-extensions.bib).

## Reference Style

The shared [CSL](../src/csl/biblatex-numeric.csl) approximates biblatex numeric. Names use full given-family form, with the first three followed by `et al.` for four or more authors. Paper titles use plain text, while book and venue titles use italics. Publication details follow the title, and DOI/URL links are retained. Full names must be present in the BibTeX records.

## Bibliography Updates

`npm run build` reads updated `.bib` files even when the article is unchanged. During `npm run dev`, make a change to the referring Markdown file and save it, or restart the server. Restart the dev server after changing the CSL.
