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

### Homepage

`HomeHero.astro` fills the first screen with the existing CuboidalQuantum canvas. The homepage header is positioned at the top of the document; other pages retain the shared fixed header behavior.

`HomeIndex.astro` provides a second section at least one viewport tall, with Blog, About, and Search links and the shared footer in its dark theme. `HomeBackdrop.astro` displays the selected static decorative background with centered `object-fit: cover` cropping on desktop and mobile.

## Markdown Pipeline

Processing chain configured in `astro.config.mjs` through the `satteri()` processor from `@astrojs/markdown-satteri`. Satteri is Astro v7's default processor; this project explicitly enables math and directive parsing. GFM and smart punctuation use Astro's defaults.

**MDAST plugins** (operate on Markdown nodes):

- `src/plugins/citations.ts` — handles `:cite[key]` and `::nocite[*]` directives, keeps a per-article numbering map, and appends the references heading and bibliography
- `src/plugins/mathjax.ts` — renders parsed math with MathJax 4 into SVG, with a separate MathJax document and stylesheet for each article. Uses the official `@mathjax/src` and `@mathjax/mathjax-tex-font` packages to retain the original TeX font and synchronous rendering. Long display formulas scroll horizontally via `displayOverflow: 'scroll'`. TeX extensions are loaded explicitly in `src/plugins/mathjax-tex-packages.ts`.
- `satteri-emoji` — GitHub emoji shortcodes

**HAST plugins** (operate on HTML nodes):

- `satteri-callouts` — GitHub-style alert blocks and their theme stylesheet, with border-box sizing in `prose.css` to keep padding within the article width
- `astro-expressive-code` injects its Satteri code-block renderer
- Astro collects images and headings for asset processing and the table of contents

**Bibliography formatting:**

`src/utils/bibliography.ts` loads BibTeX through Citation.js and formats cited records with `src/csl/biblatex-numeric.csl`. With `::nocite[*]`, uncited records are appended in BibTeX order after all citations have been visited, so the directive's position does not affect citation numbers. This local ACM-derived CSL approximates biblatex's standard numeric bibliography: full given-family names, titles before dates, type-specific publication details, and labeled DOI/URL links. Four or more authors are shortened to the first three followed by `et al.`. It is an approximation, not an official biblatex CSL. Rendering is synchronous because Citation.js shares a CSL engine per style. The MDAST plugin creates numbered links directly from the same ordered records used for the bibliography, preserving first-citation order.

Bibliography paths resolve against the article's `ctx.fileURL`; frontmatter is not rewritten. The formatter translates Citation.js's default BibTeX genre identifiers (`phdthesis`, `mastersthesis`, `techreport`) into readable labels before applying CSL. A `References` heading is generated when cited or explicitly included entries exist, before Astro collects headings. See [Markdown and citations](markdown.md) for authoring and bibliography updates.

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
