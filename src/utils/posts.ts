import { getCollection } from 'astro:content';

/**
 * Get all blog posts sorted by publication date (newest first).
 */
export async function getSortedPosts() {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
