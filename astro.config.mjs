// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';
import 'dotenv/config';

export default defineConfig({
    integrations: [tailwind()],
    adapter: netlify(),
    experimental: {
        session: true, // ✅ activation du flag requis
    },
});



