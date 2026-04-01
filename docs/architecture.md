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
| `src/pages/rss.xml.js`             | RSS feed                                                                                             |
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

- Custom CSS/SCSS, no CSS framework
- Color system: CSS custom properties defined in `src/styles/color.css`
- Fonts: Uncut Sans (body), Cascadia Code (monospace), HarmonyOS Sans (CJK fallback)
- Responsive breakpoints: 1200px, 720px, 636px
- SCSS preprocessing via Vite's modern API (`vite.config.js`)
- Print stylesheet: `src/styles/print.css`

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

| File                     | Purpose                                       |
| ------------------------ | --------------------------------------------- |
| `astro.config.mjs`       | Site URL, integrations, remark/rehype plugins |
| `ec.config.mjs`          | Expressive Code theme and styling             |
| `vite.config.js`         | SCSS config, path aliases                     |
| `src/consts.ts`          | Site title and description                    |
| `src/configs/blog.json`  | Pagination and layout settings                |
| `src/configs/about.json` | Author info for about page                    |
| `pagefind.yml`           | Search indexing configuration                 |
| `netlify.toml`           | Netlify build and deploy settings             |
