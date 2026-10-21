import { readFileSync } from 'node:fs';
import { Cite, plugins, type CSL } from '@citation-js/core';
import '@citation-js/plugin-bibtex';
import '@citation-js/plugin-csl';

const styleName = 'aevora-biblatex-numeric';
const styleUrl = new URL('../csl/biblatex-numeric.csl', import.meta.url);
const genreNames: Record<string, string> = {
  phdthesis: 'PhD thesis',
  mastersthesis: "Master's thesis",
  techreport: 'Technical report',
};

export function readBibliography(url: URL): Map<string, CSL> {
  const entries = new Cite(readFileSync(url, 'utf8')).data;
  return new Map(entries.map((entry) => [String(entry.id), entry]));
}

export function formatBibliography(entries: CSL[]): [string, string][] {
  // Keep formatting synchronous: Citation.js reuses a CSL engine for each style.
  plugins.config.get('@csl').styles.add(styleName, readFileSync(styleUrl, 'utf8'));
  // BibTeX's default thesis/report genres are identifiers, not display labels.
  const formattedEntries = entries.map((entry) => ({
    ...entry,
    genre: genreNames[entry.genre ?? ''] ?? entry.genre,
  }));
  return new Cite(formattedEntries).format('bibliography', {
    style: styleName,
    lang: 'en-US',
    format: 'html',
    nosort: true,
    hyperlinks: true,
    asEntryArray: true,
  });
}
