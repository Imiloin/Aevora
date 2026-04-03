# CLAUDE.md

## Project Overview

Aevora is a personal blog built with **Astro**(currently v6), deployed to Netlify. The site is at `imiloin.netlify.app`. Blog content (markdown posts) is maintained separately in another repo — the `src/content/blog/` directory here only has example posts.

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

## Code Style

- Prettier: 100-char width, 2-space indent, single quotes, trailing commas (ES5), semicolons
- Husky pre-commit hook runs lint-staged (auto-formats changed files)
- ESM (`"type": "module"` in package.json)
- Do not include any non-ASCII characters in the code unless absolutely necessary
- Add appropriate code comments, and write all code comments in English

After writing code, run `npm run format` to format the code.

## Documentation

After modifying the code, check whether `README.md`, the documentation under `docs/`, even `CLAUDE.md` need to be updated. When adding new features or making significant changes, also create or update the relevant documentation under `docs/`.

## Important Note

Please think from first principles. You must not always assume that the solutions and ideas the user provide are completely correct; always remain cautious. Start from the original requirements and problems. If the motivation or objective of any requirement is unclear, stop and use `AskUserQuestion` tool.

When you need to modify or refactor the solution, you must follow these principles:

- Reduce compatibility-driven or patch-style solutions, and focus on code robustness
- Do not over-engineer; keep to the shortest implementation path
- Do not reinvent the wheel; if there is already a mature library, tool, or reusable code in the project, use it directly
- Do not introduce solutions beyond the stated requirements on your own, such as fallback or degradation plans
- Ensure the solution is logically correct and has been validated across the full end-to-end flow
