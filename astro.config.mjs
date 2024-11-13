import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

import viteConfig from './vite.config.js';

import sitemap from '@astrojs/sitemap';

import remarkGemoji from "remark-gemoji";
import remarkGithubAlerts from "remark-github-alerts";
import remarkMath from 'remark-math';

import rehypeMathjax from 'rehype-mathjax';

import {
    transformerNotationDiff,
    transformerNotationHighlight,
} from '@shikijs/transformers';

// https://astro.build/config
export default defineConfig({
    site: 'https://imiloin.netlify.app/',
    integrations: [mdx(), sitemap()],
    markdown: {
        remarkPlugins: [remarkGemoji, remarkGithubAlerts, remarkMath],
        rehypePlugins: [rehypeMathjax],
        syntaxHighlight: 'shiki',
        shikiConfig: {
            theme: 'github-light',
            transformers: [
                transformerNotationDiff(),
                transformerNotationHighlight(),
            ],
        },
    },
    vite: viteConfig,
});
