import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import astroExpressiveCode from 'astro-expressive-code';

import viteConfig from './vite.config.js';

import { processBibliographyPath } from './src/plugins/process-bibliography-path.mjs';

import remarkGemoji from 'remark-gemoji';
import remarkGithubAlerts from 'remark-github-alerts';
import remarkMath from 'remark-math';

import rehypeCitation from 'rehype-citation';
import rehypeMathjax from 'rehype-mathjax';

// https://astro.build/config
export default defineConfig({
  site: 'https://imiloin.netlify.app/',
  trailingSlash: 'always',
  integrations: [astroExpressiveCode(), sitemap()],
  markdown: {
    remarkPlugins: [processBibliographyPath, remarkGemoji, remarkGithubAlerts, remarkMath],
    rehypePlugins: [
      [
        rehypeCitation,
        {
          linkCitations: true,
          csl: './src/csl/association-for-computing-machinery.csl',
        },
      ],
      rehypeMathjax,
    ],
  },
  vite: viteConfig,
});
