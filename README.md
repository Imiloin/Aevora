# Aevora

This is my personal blog website built with [Astro](https://astro.build/). It features a clean and modern design, and supports Markdown and MDX for content creation. See the website live at [imiloin.netlify.app](https://imiloin.netlify.app/).

## Project Structure

In this Astro project, you will find the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Blog posts are stored as `.md` or `.mdx` files in the `src/content/blog/` directory.

Any static assets, such as images, are located in the `public/` directory.

## Getting Started

To install and set up Astro on your machine, follow the instructions in the [Astro Documentation](https://docs.astro.build/en/install-and-setup/).

Once you have Astro installed, clone this repository and run the following commands:

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
| `npm run build`           | Builds production site and outputs it to `./dist/`                |
| `npm run preview`         | Previews build locally before deployment                          |
| `npm run astro ...`       | Executes Astro CLI commands, such as `astro add` or `astro check` |
| `npm run astro -- --help` | Displays help for using the Astro CLI                             |

## License

This project is licensed under the MIT License. Additionally, some borrowed code is licensed under the Apache-2.0 License and some fonts are licensed under the Open Font License.

## Acknowledgements

This project is adapted from the official [Blog](https://astro.build/themes/details/blog/) theme. The favicon and logo were created using AI and then manually redrawn in Adobe Illustrator.

## Credit

The following projects and resources were referenced or borrowed from:

- Cursor effect: <https://codepen.io/team/keyframers/pen/zYZVOzr>
- Cuboidal quantum at index page: <https://websim.ai/p/idlv9t1mcfkvn67ls8aj>
- Typing effect: <https://codepen.io/bradtraversy/pen/jeNjwP>
- Dynamic clock: <https://github.com/XengShi/materialYouNewTab>
- Back to top component: <https://github.com/Spikeysanju/sanju.sh>
- Button hover effect 1: <https://codepen.io/kathykato/pen/rZRaNe>
- Button hover effect 2: <https://codepen.io/aaroniker/pen/bGGVMbY>
- Button hover effect 3: <https://codepen.io/glasha_ch/pen/pVjpVO>
- Pagination: <https://github.com/zeon-studio/astroplate>
- Copy button for code blocks: <https://github.com/anurag-roy/astro-code-block>
