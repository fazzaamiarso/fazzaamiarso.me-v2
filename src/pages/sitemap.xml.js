const glob = import.meta.glob("./**/*.mdx", { eager: true });
const markdowns = Object.values(glob);

export const get = () => {
  return {
    body: `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
        <loc>https://www.fazzaamiarso.me/</loc>
        <changefreq>yearly</changefreq>
        <priority>1.0</priority>
     </url>
     <url>
        <loc>https://www.fazzaamiarso.me/about</loc>
        <changefreq>yearly</changefreq>
     </url>
     <url>
        <loc>https://www.fazzaamiarso.me/snipppets</loc>
        <changefreq>weekly</changefreq>
     </url>
     <url>
        <loc>https://www.fazzaamiarso.me/projects</loc>
        <changefreq>weekly</changefreq>
     </url>
     <url>
        <loc>https://www.fazzaamiarso.me/blog</loc>
        <changefreq>weekly</changefreq>
     </url>
     ${markdowns
       .map((item) => {
         return `<url>
        <loc>https://www.fazzaamiarso.me${item.url}</loc>
        <changefreq>monthly</changefreq>
        <lastmod>${item.frontmatter.updatedAt ?? item.frontmatter.publishedAt}</lastmod>
     </url>`;
       })
       .join("\n")}
  </urlset> 
  `,
    headers: { "Content-Type": "text/xml" },
  };
};
