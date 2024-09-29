import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import rehypeMathjax from 'rehype-mathjax';
import remarkGithubAlerts from "remark-github-alerts";
import remarkMath from 'remark-math';

import customBlockquote from './src/scripts/remark-custom-blockquote.js';

// https://astro.build/config
export default defineConfig({
    site: 'https://example.com',
    integrations: [mdx(), sitemap()],
    markdown: {
        remarkPlugins: [remarkGithubAlerts, remarkMath, customBlockquote],
        rehypePlugins: [rehypeMathjax],
    },
});
