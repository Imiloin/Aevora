import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

import viteConfig from './vite.config.js';

import sitemap from '@astrojs/sitemap';

import rehypeMathjax from 'rehype-mathjax';
import remarkGithubAlerts from "remark-github-alerts";
import remarkMath from 'remark-math';

// https://astro.build/config
export default defineConfig({
    site: 'https://example.com',
    integrations: [mdx(), sitemap()],
    markdown: {
        remarkPlugins: [remarkGithubAlerts, remarkMath],
        rehypePlugins: [rehypeMathjax],
        syntaxHighlight: 'shiki',
        shikiConfig: {
            theme: 'github-light',
        },
    },
    vite: viteConfig,
});
