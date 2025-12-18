/**
 * Slugify a string based on RFC 3986 and common heading anchor standards.
 *
 * - Letters are converted to lower-case.
 * - Spaces are replaced by hyphens (-).
 * - Leading and trailing whitespace are removed.
 * - Markup formatting (like _, *, `) is removed.
 * - Punctuation and other non-alphanumeric characters (except hyphens) are removed.
 * - Multiple hyphens are collapsed into one.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[_*`]/g, '') // Remove simple markdown formatting
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\p{L}\p{N}-]/gu, '') // Remove punctuation (Unicode aware)
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start
    .replace(/-+$/, ''); // Trim - from end
}
