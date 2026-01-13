// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare(),

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi', 'sv'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false
    }
  }
});