import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import cloudflare from "@astrojs/cloudflare";
import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), icon(), sitemap({
    i18n: {
      defaultLocale: "it",
      locales: {
        it: "it",
        en: "en"
      }
    }
  })],
  output: "hybrid",
  adapter: cloudflare(),
  site: "https://gruppoedoardo.it/",

  i18n: {
    defaultLocale: "it",
    locales: ["it", "en"]
  },
  image: {
    domains: ["privato.gruppoedoardo.it"]
  }
});