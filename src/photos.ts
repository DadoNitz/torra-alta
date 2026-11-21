// Filled at build time from public/img (vite.config.ts), so a missing brief image never costs a 404.
declare const __PUBLIC_IMAGES__: string[];

export const hasPhoto = (name: string) => __PUBLIC_IMAGES__.includes(name);
export const photo = (name: string, fallback: string) => (hasPhoto(name) ? `./img/${name}` : fallback);
