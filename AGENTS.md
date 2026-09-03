# AGENTS.md

## Project Overview

Aevora is a personal blog built with **Astro**(currently v7), deployed to Netlify. The site is at `imiloin.netlify.app`. Blog content (markdown posts) is maintained separately in another repo — the `src/content/blog/` directory here only has example posts.

## Commands

See [docs/commands.md](docs/commands.md) for full details.

- `npm run dev` — dev server (localhost:4321, run `npm run build` first for search)
- `npm run build` — build site + Pagefind index
- `npm run clean` — clean build artifacts
- `npm run format` / `npm run check` — Prettier format / check

## Architecture

See [docs/architecture.md](docs/architecture.md) for full details including content schema, page routing, markdown pipeline, styling, and path aliases.

Maintain a high-quality project architecture. Do not put all code into a single file; separate maintainable modules or components, and refactor as needed.

## Naming Conventions

- **Files**: Astro components/layouts use PascalCase (`PostCard.astro`); everything else uses kebab-case (`blog.json`, `toc-display.ts`, `global.css`). Scripts use `.ts` only.
- **Code**: camelCase for variables/functions, PascalCase for types/interfaces, kebab-case for CSS classes.

## Syntax

- Prettier: 100-char width, 2-space indent, single quotes, trailing commas (ES5), semicolons
- Husky pre-commit hook runs lint-staged (auto-formats changed files)
- ESM (`"type": "module"` in package.json)
- Do not include any non-ASCII characters in the code unless absolutely necessary
- Add appropriate code comments, and write all code comments in English

After writing code, run `npm run format` to format the code.

## Styling

- Use Tailwind classes for styling (custom CSS as last resort)
- Use inline CSS only for dynamic values
- Avoid Tailwind `!` important modifier, achieve specificity via `@layer` or conditional classes

## Documentation

After modifying the code, check whether `README.md` and relevant documentation under `docs/` need to be updated. When adding new features or making significant changes, also create or update relevant documentation under `docs/`. ALWAYS let the documentation sync with the code.

## Important Note

### Your Role

You will be primarily responsible for completing this project, and you may freely modify the code in the project. However, if you need to modify configuration files, let the user know.

### Think and Interact Before Coding

Don't assume. Don't hide confusion. Please think from first principles. Before implementing,

- Attempt to understand the user's intent. If uncertain, ask. If multiple interpretations exist, present them - don't pick silently.
- Think through the requirements and the tradeoffs involved. If a simpler approach exists, say so. Push back when warranted.

The user may not be a coding expert; in certain respects, you are more of an expert than the user. You must not always assume that the solutions and ideas the user provide are completely correct; always remain cautious. Start from the original requirements and problems. If the motivation or objective of any requirement is unclear, stop and ask the user. Feel free to ask any questions you have.

### Principles

This is NOT a production-level project. There is no need to make the code 100% reliable or robust enough to handle every edge case. Don't over-engineer it; stick to the shortest implementation path.

At the same time, do not be overly constrained by backward compatibility. If a change genuinely improves the final outcome, it is acceptable to make significant adjustments to the design or implementation approach.

When writing or editing code, follow these principles:

- Avoid compatibility-driven or patch-style solutions; focus on making the codebase more robust in the long term
- Do not reinvent the wheel; if a mature library, tool, or reusable implementation already exists in the project, use it directly
- Do not introduce solutions beyond the stated requirements, such as fallback or degradation plans
- Do not `git commit` after writing or editing code. Summarize the diff, and let the user decide
