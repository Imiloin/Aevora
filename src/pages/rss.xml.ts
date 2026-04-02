import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '@configs/index';

export async function GET(context: { site: string }) {
  const posts = await getCollection('blog');
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.id}/`,
    })),
  });
}
