import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  // Load Markdown files in the src/content/blog directory.
  // Render during the page build so external bibliography data is read on each build.
  loader: glob({ base: './src/content/blog', pattern: '**/*.md', deferRender: true }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image(),
      bibliography: z.string().optional(),
      series: z.array(z.string()).optional(),
    }),
});

export const collections = { blog: blogCollection };
