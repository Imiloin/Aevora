import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import remarkGithubAlerts from "remark-github-alerts";

// https://astro.build/config
export default defineConfig({
    site: 'https://example.com',
    integrations: [mdx(), sitemap()],
    markdown: {
        remarkPlugins: [remarkGithubAlerts],
    },
});
