# Architecture

## Content System

Single Astro content collection (`blog`) defined in `src/content.config.ts`. Uses glob loader for `**/*.md` files.

Frontmatter schema (Zod-validated):

| Field          | Type       | Required |
| -------------- | ---------- | -------- |
| `title`        | `string`   | Yes      |
| `description`  | `string`   | Yes      |
| `pubDate`      | `date`     | Yes      |
| `heroImage`    | `image()`  | Yes      |
| `updatedDate`  | `date`     | No       |
| `bibliography` | `string`   | No       |
| `series`       | `string[]` | No       |

## Page Routing

| Route                              | Purpose                                                                                              |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `src/pages/index.astro`            | Homepage with interactive elements (custom cursor, 3D canvas animation, analog clock, typing effect) |
| `src/pages/blog/[...slug].astro`   | Individual blog posts                                                                                |
| `src/pages/blog/index.astro`       | Blog listing (first page)                                                                            |
| `src/pages/blog/page/[page].astro` | Paginated blog listing                                                                               |
| `src/pages/series/[series].astro`  | Archive pages by series tag                                                                          |
| `src/pages/about.astro`            | About page                                                                                           |
| `src/pages/search.astro`           | Pagefind search page                                                                                 |
| `src/pages/rss.xml.ts`             | RSS feed                                                                                             |
| `src/pages/404.astro`              | Custom 404 page                                                                                      |

Pagination: first page shows 5 posts, subsequent pages show 6 (configured in `src/configs/blog.json`).

## Markdown Pipeline

Processing chain configured in `astro.config.mjs`:

**Remark plugins** (operate on mdast):

- `process-bibliography-path` — custom plugin (`src/plugins/`) that resolves bibliography file paths in frontmatter
- `remark-gemoji` — GitHub emoji shortcodes
- `remark-github-alerts` — GitHub-style alert blocks
- `remark-math` — LaTeX math syntax

**Rehype plugins** (operate on hast):

- `rehype-citation` — academic citations using CSL style (`src/csl/association-for-computing-machinery.csl`)
- `rehype-mathjax` — renders math expressions

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
- Blog content typography: `src/styles/prose.css` — scoped under `.prose` to prevent leaking into UI components (headings, links, paragraphs, images, tables, code, blockquotes, etc.)
- All styles are plain CSS (no SCSS preprocessor)
- Print stylesheet: `src/styles/print.css`

## Icons

Two separate icon directories serve different purposes:

- `src/icons/` — raw SVG files imported as image assets (e.g., `logo-badge.svg`, `logo-text.svg`)
- `src/components/icons/` — Astro components wrapping inline SVGs, accepting `class?` and `size?` props

## Path Aliases

Defined in both `tsconfig.json` and `vite.config.js`:

| Alias           | Maps to           |
| --------------- | ----------------- |
| `@components/*` | `src/components/` |
| `@configs/*`    | `src/configs/`    |
| `@icons/*`      | `src/icons/`      |
| `@layouts/*`    | `src/layouts/`    |
| `@styles/*`     | `src/styles/`     |
| `@scripts/*`    | `src/scripts/`    |
| `@utils/*`      | `src/utils/`      |

## Key Config Files

| File                     | Purpose                                             |
| ------------------------ | --------------------------------------------------- |
| `astro.config.mjs`       | Site URL, integrations, remark/rehype plugins       |
| `ec.config.mjs`          | Expressive Code theme and styling                   |
| `vite.config.js`         | Tailwind plugin, path aliases                       |
| `src/configs/site.json`  | Site title and description                          |
| `src/configs/blog.json`  | Pagination, layout, hero image, TOC settings        |
| `src/configs/about.json` | Author info for about page                          |
| `src/configs/home.json`  | Homepage config (canvas, typing effect, quote text) |
| `src/configs/index.ts`   | Typed barrel re-export for all configs              |
| `pagefind.yml`           | Search indexing configuration                       |
| `netlify.toml`           | Netlify build and deploy settings                   |
