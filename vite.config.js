import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { EVENTS } from './src/data/events.js';

// Public address for share tags, robots.txt and the sitemap. Vercel supplies its production domain;
// set SITE_URL on the host to override it, for example after adding a custom domain.
const siteUrl = () => {
  const host = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (!host) return '';
  return (/^https?:\/\//.test(host) ? host : `https://${host}`).replace(/\/$/, '');
};

const siteFiles = () => ({
  name: 'site-files',
  transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl()),
  generateBundle() {
    const url = siteUrl();
    const robots = ['User-agent: *', 'Allow: /', 'Disallow: /passes', ...(url ? ['', `Sitemap: ${url}/sitemap.xml`] : [])];
    this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots.join('\n')}\n` });
    if (!url) return; // a sitemap needs absolute addresses
    const paths = ['/', '/contact', ...EVENTS.map((event) => `/events/${event.slug}`)];
    const entries = paths.map((path) => `  <url><loc>${url}${path}</loc></url>`).join('\n');
    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), siteFiles()],
  server: {
    port: 3000,
    open: false,
    host: true,
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-animation': ['framer-motion', 'gsap', 'lenis'],
          'vendor-ui': ['lucide-react', 'canvas-confetti'],
        },
      },
    },
  },
});
