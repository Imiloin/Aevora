import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import astroExpressiveCode from 'astro-expressive-code';
import { satteri } from '@astrojs/markdown-satteri';
import satteriCallouts from 'satteri-callouts';
import { satteriEmoji } from 'satteri-emoji';

import viteConfig from './vite.config.js';

import { citations } from './src/plugins/citations.ts';
import { mathjax } from './src/plugins/mathjax.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://imiloin.netlify.app/',
  trailingSlash: 'always',
  integrations: [astroExpressiveCode(), sitemap()],
  markdown: {
    processor: satteri({
      features: { math: true, directive: true },
      mdastPlugins: [citations, mathjax, satteriEmoji({ shortcodes: ['github'] })],
      hastPlugins: [satteriCallouts({ theme: 'github' })],
    }),
  },
  vite: viteConfig,
});
