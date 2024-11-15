import path from 'path';

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
    }
}
