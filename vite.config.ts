import { readdirSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Images listed in docs/image-briefs.md replace the current photos once they exist in public/img.
const images = (() => { try { return readdirSync(new URL('./public/img', import.meta.url)); } catch { return []; } })();

export default defineConfig({
  base: './',
  plugins: [react()],
  define: { __PUBLIC_IMAGES__: JSON.stringify(images) },
});
