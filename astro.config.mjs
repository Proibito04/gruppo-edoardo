import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import cloudflare from "@astrojs/cloudflare";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), icon()],
  output: "hybrid",
  adapter: cloudflare(),
  i18n: {
    defaultLocale: "it",
    locales: ["it", "en"]
  },
  image: {
    domains: ["privato.gruppoedoardo.it"],
  }
});