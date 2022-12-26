import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import mdx from "@astrojs/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { h } from "hastscript";
import { toString } from "hast-util-to-string";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "https://fazzaamiarso.me",
  integrations: [tailwind(), mdx({
    extendPlugins: true,
    rehypePlugins: [[rehypeAutolinkHeadings, {
      behavior: "before",
      group: () => {
        return h("div.heading-group");
      },
      content: node => {
        return [h("span.sr-only", `go to ${toString(node)} section`)];
      }
    }]]
  }), react()]
});