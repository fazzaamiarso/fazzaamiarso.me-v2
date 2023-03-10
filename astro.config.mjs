import { defineConfig } from "astro/config";
import tokyoNight from "./tokyo-night.json";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import mdx from "@astrojs/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import { h } from "hastscript";
import { toString } from "hast-util-to-string";

// https://astro.build/config
import react from "@astrojs/react";
import { remarkReadingTime } from "./remarkPlugins.mjs";

// https://astro.build/config
// import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
// import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "https://fazzaamiarso.me",
  integrations: [
    tailwind(),
    mdx({
      extendPlugins: true,
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [
        [
          rehypeExternalLinks,
          {
            rel: ["nofollow"],
            referrerpolicy: "strict-origin-when-cross-origin",
            target: "_blank",
          },
        ],
        [
          rehypeAutolinkHeadings,
          {
            behavior: "before",
            group: () => {
              return h("div.heading-group");
            },
            content: (node) => {
              return [h("span.sr-only", `go to ${toString(node)} section`)];
            },
          },
        ],
      ],
    }),
    react(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
  adapter: vercel(),
  markdown: {
    shikiConfig: {
      theme: tokyoNight,
    },
  },
});
