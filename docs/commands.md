# Commands

## Development

```bash
npm run dev        # Start dev server at localhost:4321
npm run preview    # Serve the built dist/ directory locally
```

> **Note:** Run `npm run build` at least once before `npm run dev`, so that the Pagefind search index exists and search works locally.

## Build

```bash
npm run build
```

This runs a multi-step process:

1. `astro build` — generates static site into `dist/`
2. `npx pagefind` — generates search index from `dist/`
3. Copies `dist/pagefind/` and `dist/_astro/` into `public/` (so dev server can serve them)

After changing only a `.bib` file, `npm run build` reads the updated bibliography because the content loader uses `deferRender: true`. In the dev server, save a change to the referring Markdown file or restart the server; bibliography files are not registered as live module dependencies. See [Markdown and citations](markdown.md).

## Clean

```bash
npm run clean      # Removes dist/, .astro/, public/_astro/, public/pagefind/
```

## Formatting

```bash
npm run format     # Format code and apply Markdown fixes
npm run check      # Check code and Markdown without writing (CI-friendly)
```

Prettier formats code using `.prettierrc.mjs`: 100-char width, 2-space indent, single quotes, trailing commas (ES5), and semicolons. Astro files use `prettier-plugin-astro`.

`markdownlint-cli2` formats Markdown using `.markdownlint.json`, including dash lists and compact tables. File exclusions are configured in `.markdownlint-cli2.jsonc`.

Husky runs `lint-staged` to format staged files. The recommended VS Code extensions use the same formatter selection.
