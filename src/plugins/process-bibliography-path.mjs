import path from 'path';
import { visit } from 'unist-util-visit';

export function processBibliographyPath() {
  // All remark and rehype plugins return a separate function
  return function (tree, file) {
    if (!file.data.astro?.frontmatter?.bibliography) {
      return;
    }
    const relativeMarkdownBibliographyPath = file.data.astro.frontmatter.bibliography;

    // Resolve the original bibliography path relative to the Markdown file
    const markdownDir = path.dirname(file.history[0]);
    const absoluteBibliographyPath = path.resolve(markdownDir, relativeMarkdownBibliographyPath);

    // Convert the absolute path to a path relative to the root directory
    const rootDir = process.cwd(); // Assuming the root directory is the current working directory
    const relativeRootBibliographyPath = path.relative(rootDir, absoluteBibliographyPath);

    file.data.astro.frontmatter.bibliography = relativeRootBibliographyPath;

    // Add "References" heading at the end of the document if `bibliography` is set
    visit(tree, 'root', (node) => {
      node.children.push({
        type: 'heading',
        depth: 2,
        children: [{ type: 'text', value: 'References' }],
      });
    });
  };
}
