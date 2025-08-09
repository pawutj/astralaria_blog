import { defineConfig } from "astro/config";
import vercel from '@astrojs/vercel/static';
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import swup from "@swup/astro";

import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkMath from "remark-math";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";

import YukinaConfig from "./yukina.config";

import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  output: 'static', // pre-build ทุกหน้า
  adapter: vercel(),
  site: YukinaConfig.site,
  
  // Enable compression and optimization
  compressHTML: true,
  
  vite: {
    build: {
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Optimize bundle
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['lozad', 'overlayscrollbars'],
          }
        }
      }
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['lozad', 'overlayscrollbars']
    }
  },

  integrations: [
    tailwind(),
    svelte(),
    icon(),
    swup({
      theme: false,
      containers: ["main", "footer", ".banner-inner"],
      smoothScrolling: true,
      progress: true,
      cache: true,
      preload: true,
      updateHead: true,
      updateBodyClass: false,
      globalInstance: true,
    }),
    sitemap(),
    pagefind(),
  ],
  markdown: {
    shikiConfig: {
      theme: "github-dark-default",
    },
    remarkPlugins: [remarkReadingTime, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      rehypeKatex,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
        },
      ],
    ],
  },
});
