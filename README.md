# Aevora

This is my personal blog website built with [Astro](https://astro.build/). It features a clean and modern design, and uses markdown for content creation. See the website live at [imiloin.netlify.app](https://imiloin.netlify.app/) (template only demo: [aevora.netlify.app](https://aevora.netlify.app/)).

This repository holds the open-source codebase for my blog's structure and design. It includes all the necessary components, layouts, and configurations, excluding the blog post content itself, which is maintained in a separate, private repository.

## Project Structure

In this Astro project, you will find the following folders and files:

```text
├── docs/                # Architecture and command documentation
├── public/
├── src/
│   ├── components/      # Astro components (includes icons/ subdirectory)
│   ├── configs/         # JSON configs with typed barrel export
│   ├── content/         # Blog posts (markdown)
│   ├── icons/           # Raw SVG files imported as image assets
│   ├── layouts/         # Page layouts (BaseLayout, BlogPost)
│   ├── pages/           # Route pages
│   ├── plugins/         # Custom remark/rehype plugins
│   ├── scripts/         # TypeScript client-side scripts
│   ├── styles/          # Global CSS, Tailwind config, prose styles
│   └── utils/           # Shared utilities (pagination, posts, slug)
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Blog posts are stored as `.md` files in the `src/content/blog/` directory.

Any static assets, such as images, are located in the `public/` directory.

## Getting Started

Some prerequisites are required. Check [Astro Documentation](https://docs.astro.build/en/install-and-setup/#prerequisites) for more information.

After that, clone this repository and run the following commands:

```bash
npm install
npm run dev
```

This will start a local development server that you can access at [localhost:4321](http://localhost:4321/).

> Note: To ensure the search feature works properly, you might need to run `npm run build` before `npm run dev` to generate the index for Pagefind.

## Commands

All commands should be run from the root of the project in your terminal.

> It is recommended to **use Bash** for running these commands. If you are using Windows, consider installing Git Bash. Running `npm run build` in the Windows Command Prompt could lead to issues.

| Command                   | Action                                                            |
| :------------------------ | :---------------------------------------------------------------- |
| `npm install`             | Installs project dependencies                                     |
| `npm run dev`             | Starts the local development server at `localhost:4321`           |
| `npm run build`           | Builds production site and outputs it to `dist/`                  |
| `npm run clean`           | Removes the `dist/` directory and dumped cache in `public/`       |
| `npm run format`          | Formats code using Prettier                                       |
| `npm run preview`         | Previews build locally before deployment                          |
| `npm run astro ...`       | Executes Astro CLI commands, such as `astro add` or `astro check` |
| `npm run astro -- --help` | Displays help for using the Astro CLI                             |

For deployments to Netlify, use `netlify.toml` to configure the build process.

## License

The content in this repository is licensed under the MIT License. Additionally, some borrowed code is licensed under the Apache-2.0 License.

Uncut Sans and Cascadia Code font are licensed under the SIL Open Font License, Version 1.1. HarmonyOS Sans font is licensed under HarmonyOS Sans Fonts License Agreement.

## Acknowledgements

This project is adapted from the official [Blog](https://astro.build/themes/details/blog/) theme. The favicon and logo were created using AI and then manually redrawn in Adobe Illustrator.

## Credit

The following projects and resources were referenced or borrowed from:

- Cursor effect at index page: <https://codepen.io/team/keyframers/pen/zYZVOzr>
- Cuboidal quantum at index page: <https://websim.ai/p/idlv9t1mcfkvn67ls8aj>
- Typing effect: <https://codepen.io/bradtraversy/pen/jeNjwP>
- Dynamic clock: <https://github.com/XengShi/materialYouNewTab>
- Back to top component: <https://github.com/Spikeysanju/sanju.sh>
- Button hover effect 1: <https://uiverse.io/cssbuttons-io/brown-otter-21>
- Button hover effect 2: <https://codepen.io/aaroniker/pen/bGGVMbY>
- Button hover effect 3: <https://codepen.io/glasha_ch/pen/pVjpVO>
- Pagination: <https://github.com/zeon-studio/astroplate>
- Details & summary styling: <https://codepen.io/wynandacademy/pen/zYMaxLq>
