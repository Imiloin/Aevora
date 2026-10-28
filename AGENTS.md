# AGENTS.md

## Project Overview

Aevora is a personal blog template built with **[Astro](https://astro.build/)** (currently v7), deployed to Netlify. The site is at `imiloin.netlify.app`.

<note applies-to="Aevora">
  Blog content (markdown posts) is maintained separately in another repo — the `src/content/blog/` directory here only has example posts.
</note>

## Commands

See [docs/commands.md](docs/commands.md) for full details.

- `npm run dev` — dev server (localhost:4321, run `npm run build` first for search)
- `npm run build` — build site + Pagefind index
- `npm run clean` — clean build artifacts
- `npm run format` / `npm run check` — Prettier for code, markdownlint for Markdown

## Architecture

See [docs/architecture.md](docs/architecture.md) for full details including content schema, page routing, markdown pipeline, styling, and path aliases.

Maintain a high-quality project architecture. Split modules when it improves clarity or reuse, and refactor as needed. Avoid abstractions and configuration without a concrete need.

## Code Conventions

### Naming

- Files: Astro components/layouts use PascalCase (`PostCard.astro`). Other custom files use kebab-case (`toc-display.ts`, `global.css`). Preserve conventional and framework-required filenames (`[...slug].astro`). Scripts use `.ts` only.
- Code: camelCase for variables/functions, PascalCase for types/interfaces, kebab-case for CSS classes.

### Characters and Comments

- Prefer ASCII characters in code unless non-ASCII characters are necessary.
- Add comments where helpful, and write all code comments in English.

### Formatting

- Prettier: 100-character width, 2-space indentation, single quotes, ES5 trailing commas, and semicolons.
- Markdown: follow the selected rules in `.markdownlint.json`. Preserve math, HTML, and prose layout. Do not format Markdown with Prettier.
- The Husky pre-commit hook runs lint-staged to automatically format changed files.

### Styling

- Prefer Tailwind utilities for component styling.
- Avoid Tailwind `!` important modifier, achieve specificity via `@layer` or conditional classes.
- Use shared CSS for article typography and rules that are clearer as selectors.
- Use inline CSS only for dynamic values.

## Validation

Before handing off changes:

- Run `npm run format`, then `npm run check`.
- Run `npm run build` and ensure it completes successfully.
- For visual changes, use Playwright MCP to inspect the affected pages at desktop, tablet, and mobile viewport widths (e.g., 1440px, 768px, and 390px). Review screenshots for layout and unintended overflow, verify relevant interactions, and check for browser console errors.

## Documentation

After modifying the code, check whether `README.md` and relevant documentation under `docs/` need to be updated. When adding new features or making significant changes, also create or update relevant documentation under `docs/`. ALWAYS let the documentation sync with the code.

Never narrate change history ("now", "previously", "no longer") and never address the reviewer ("this correctly handles..."). State how the code works, not how it came to be or why the change is right.

## Principles

### Think and Interact Before Coding

Don't assume. Don't hide confusion. Please think from first principles. Before implementing,

- Attempt to understand the user's intent. If something is unclear, stop. Name what's confusing.
- State your assumptions explicitly. If multiple interpretations exist, present them - don't pick silently.
- Think through the requirements and the tradeoffs involved. If a simpler approach exists, say so. Push back when warranted.

The user may not be a coding expert, you are more of an expert than the user in certain respects. Evaluate proposed solutions against the underlying requirements rather than accepting them automatically. Start from the original requirements and problems. If the motivation or objective is unclear, stop and ask the user. Feel free to ask any questions you have before you start coding.

### Keep Changes Focused and Smart

This is NOT a production-level project, so prioritize simplicity and practical results.

- Do not reinvent the wheel. If a mature library, tool, or reusable implementation already exists, use it directly.
- Take the shortest implementation path. Implement only what the request requires.
- Avoid over-engineering. Do not add speculative features, configurability, abstractions, or handling for impossible scenarios.
- Avoid compatibility-driven or patch-style solutions. Focus on making the codebase more robust in the long term.
- Do not let backward compatibility limit meaningful improvements. Significant design or implementation changes are acceptable when they genuinely improve the final outcome.

### Workspace

- You may freely modify the code in the project. However, if you need to modify configuration files, let the user know.
- Prefer git-ignored directories for temporary files, test scripts, scaffolding, and other artifacts unrelated to the project runtime.
- Do not `git commit` after editing code. Summarize the diff, and let the user decide.
