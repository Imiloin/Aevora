import type { CollectionEntry } from 'astro:content';
import blogConfig from '@configs/blog.json';

const { postsPerPage, firstPagePosts } = blogConfig.pagination;

export interface PaginationInfo {
  totalPages: number;
  postsPerPage: number;
  firstPagePosts: number;
}

/**
 * Calculate pagination metadata from total post count.
 */
export function getPaginationInfo(totalPosts: number): PaginationInfo {
  const totalPages = Math.ceil((totalPosts - firstPagePosts) / postsPerPage) + 1;
  return { totalPages, postsPerPage, firstPagePosts };
}

/**
 * Slice posts for a specific page.
 */
export function paginatePosts(
  posts: CollectionEntry<'blog'>[],
  currentPage: number
): CollectionEntry<'blog'>[] {
  const start = currentPage === 1 ? 0 : firstPagePosts + (currentPage - 2) * postsPerPage;
  const end = currentPage === 1 ? firstPagePosts : start + postsPerPage;
  return posts.slice(start, end);
}

/**
 * Build the page number list with ellipsis for pagination UI.
 */
export function buildPageList(currentPage: number, totalPages: number): (number | string)[] {
  const pageList: (number | string)[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      pageList.push(i);
    } else if (i === currentPage - 3 || i === currentPage + 3) {
      pageList.push('...');
    }
  }
  return pageList;
}
