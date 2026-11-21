import { readFile, writeFile } from 'node:fs/promises';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

// Vite loads the CSS imports of the React Bits components, which plain Node cannot.
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const { default: App } = await vite.ssrLoadModule('/src/App.tsx');
const file = new URL('../dist/index.html', import.meta.url);
const template = await readFile(file, 'utf8');
if (!template.includes('<div id="root"></div>')) throw new Error('Missing Vite root');
await writeFile(file, template.replace('<div id="root"></div>', `<div id="root">${renderToString(<App />)}</div>`));
await vite.close();
console.log('Prerendered Torra Alta: content is available before hydration.');
