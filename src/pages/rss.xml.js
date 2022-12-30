import rss from "@astrojs/rss";

const glob = import.meta.glob("./blog/*.mdx", { eager: true });
const posts = Object.values(glob);

console.log(posts[0]);
export const get = () =>
  rss({
    title: "Fazza Razaq Amiarso's Blog",
    description:
      "A place where I share my knowldege and learning mostly on Frontend (React), A11Y, and sometimes full-stack. Sharing struggles at time.",
    site: import.meta.env.SITE,
    items: posts.map((p) => ({
      title: p.frontmatter.title,
      link: p.url,
      pubDate: p.frontmatter.publishedAt,
    })),
    stylesheet: "/rss/stylesheet.xsl",
  });
