# Architecture

## Content System

Single Astro content collection (`blog`) defined in `src/content.config.ts`. Uses glob loader for `**/*.md` files with `deferRender: true`. Rendering during the page build avoids retaining bibliography output in the content store between builds.

Frontmatter schema (Zod-validated):

| Field | Type | Required |
| --- | --- | --- |
| `title` | `string` | Yes |
| `description` | `string` | Yes |
| `pubDate` | `date` | Yes |
| `heroImage` | `image()` | Yes |
| `updatedDate` | `date` | No |
| `bibliography` | `string` | No |
| `series` | `string[]` | No |

## Page Routing

| Route | Purpose |
| --- | --- |
| `src/pages/index.astro` | Minimal homepage with a generative canvas cover and navigation index |
| `src/pages/blog/[...slug].astro` | Individual blog posts |
| `src/pages/blog/index.astro` | Blog listing (first page) |
| `src/pages/blog/page/[page].astro` | Paginated blog listing |
| `src/pages/series/[series].astro` | Archive pages by series tag |
| `src/pages/about.astro` | About page |
| `src/pages/search.astro` | Pagefind search page |
| `src/pages/rss.xml.ts` | RSS feed |
| `src/pages/404.astro` | Custom 404 page |

Pagination: first page shows 5 posts, subsequent pages show 6 (configured in `src/configs/blog.json`).

Blog routes list entries in `getStaticPaths()` and call `render(post)` in the page body. During development, opening an article renders only that entry, avoiding compilation of the entire collection on the first article request.

### Homepage

`HomeHero.astro` fills the first screen with the existing CuboidalQuantum canvas. The homepage header is positioned at the top of the document; other pages retain the shared fixed header behavior.

`HomeIndex.astro` provides a second section at least one viewport tall, with Blog, About, and Search links and the shared footer in its dark theme. `HomeBackdrop.astro` displays the selected static decorative background with centered `object-fit: cover` cropping on desktop and mobile.

## Markdown Pipeline

Processing chain configured in `astro.config.mjs` through the `satteri()` processor from `@astrojs/markdown-satteri`. Satteri is Astro v7's default processor; this project explicitly enables math and directive parsing. GFM and smart punctuation use Astro's defaults.

**MDAST plugins** (operate on Markdown nodes):

See [Custom Markdown Plugins](plugins.md) for the purpose and design of the local plugins.

- `src/plugins/bare-text-directives.ts` — restores bare single-colon directives to text before directive handlers run
- `src/plugins/citations.ts` — handles `:cite[key]` and `::nocite[*]` directives, keeps a per-article numbering map, and appends the references heading and bibliography
- `src/plugins/mathjax.ts` — renders inline and display math to SVG with MathJax 4
- `satteri-emoji` — GitHub emoji shortcodes

**HAST plugins** (operate on HTML nodes):

- `satteri-callouts` — GitHub-style alert blocks and their theme stylesheet, with border-box sizing in `prose.css` to keep padding within the article width
- `astro-expressive-code` injects its Satteri code-block renderer
- Astro collects images and headings for asset processing and the table of contents

**Bibliography formatting:**

`src/utils/bibliography.ts` loads BibTeX through Citation.js and formats entries with `src/csl/biblatex-numeric.csl`. The citation plugin creates matching numbered links and a `References` heading before Astro collects headings. See the [citation plugin](plugins.md#citations) for numbering, style, and bibliography updates.

**Code blocks:**

- `astro-expressive-code` with `github-light` theme, configured in `ec.config.mjs`
- Optional line numbers via `@expressive-code/plugin-line-numbers`

## Styling

- **Tailwind CSS v4** — via `@tailwindcss/vite` plugin, configured in `src/styles/tailwind.css`
  - Preflight (base reset) is intentionally excluded to avoid conflicts with existing `global.css`
  - Standardized breakpoints: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1400px
  - Use `max-sm:`, `max-md:`, `max-lg:`, `max-xl:`, `max-2xl:` variants — no arbitrary breakpoints
  - Use canonical classes:
    - Spacing: `p-4` (16px), `m-6` (24px), etc. — no arbitrary values like `p-[18px]`
    - Vars: `text-(--gray-700)` — no arbitrary values like `text-[var(--gray-700)]`
    - Sizes: `m-[0.5rem_0_1.5rem_0]` — no arbitrary values like `[margin:0.5rem_0_1.5rem_0]`
    - etc.
  - Font tokens mapped to existing design tokens (`--font-sans`, `--font-mono`)
  - Scoped `<style>` blocks in Astro components need `@reference` to access Tailwind theme variables
- Color system: CSS custom properties defined in `src/styles/color.css`
- Fonts: Uncut Sans (body), Cascadia Code (monospace), HarmonyOS Sans (CJK fallback)
- Blog content typography: `src/styles/prose.css` — scoped under `.prose` to prevent leaking into UI components (headings, links, paragraphs, images, tables, code, blockquotes, etc.). Display math scrollbars use the same thumb colors, padding, and hover behavior as Expressive Code blocks.
- Figure captions are numbered automatically; Expressive Code frame captions are excluded from the figure counter. See `src/content/blog/examples/markdown-extensions.md` for source and rendered examples of the article extensions.
- All styles are plain CSS (no SCSS preprocessor)
- Print stylesheet: `src/styles/print.css`

## Icons

Two separate icon directories serve different purposes:

- `src/icons/` — raw SVG files imported as image assets (e.g., `logo-badge.svg`, `logo-text.svg`)
- `src/components/icons/` — Astro components wrapping inline SVGs, accepting `class?` and `size?` props

## Path Aliases

Directory aliases are defined in `tsconfig.json` and resolved by Astro. `vite.config.js` also defines `@` for `src/`.

| Alias | Maps to |
| --- | --- |
| `@components/*` | `src/components/` |
| `@configs/*` | `src/configs/` |
| `@icons/*` | `src/icons/` |
| `@layouts/*` | `src/layouts/` |
| `@plugins/*` | `src/plugins/` |
| `@styles/*` | `src/styles/` |
| `@scripts/*` | `src/scripts/` |
| `@utils/*` | `src/utils/` |

## Key Config Files

| File | Purpose |
| --- | --- |
| `astro.config.mjs` | Site URL, integrations, Satteri features and plugins |
| `ec.config.mjs` | Expressive Code theme and styling |
| `vite.config.js` | Tailwind plugin, path aliases |
| `src/configs/site.json` | Site title and description |
| `src/configs/blog.json` | Pagination, layout, hero image, TOC settings |
| `src/configs/about.json` | Author info for about page |
| `src/configs/home.json` | Homepage generative canvas configuration |
| `src/configs/index.ts` | Typed barrel re-export for all configs |
| `pagefind.yml` | Search indexing configuration |
| `netlify.toml` | Netlify build and deploy settings |
| `.prettierrc.mjs` | Code formatting rules |
| `.markdownlint.json` | Selected Markdown rules and warning levels |
| `.markdownlint-cli2.jsonc` | Markdown file exclusions shared by the CLI and VS Code |
