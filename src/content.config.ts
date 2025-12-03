import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  // Load Markdown files in the src/content/blog directory.
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      heroImage: image(),
      bibliography: z.string().optional(),
      series: z.array(z.string()).optional(),
    }),
});

export const collections = { blog: blogCollection };
