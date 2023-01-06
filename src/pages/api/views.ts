import type { APIRoute } from "astro";
import { prisma } from "lib/prisma";

export const put: APIRoute = async ({ request }) => {
  const req = await request.json();
  const slug = req.slug as string;

  const postMeta = await prisma.post.upsert({
    where: { slug },
    select: { views: true, _count: { select: { likes: true } } },
    create: { slug },
    update: { views: { increment: 1 } },
  });

  return new Response(JSON.stringify({ views: postMeta.views, likes: postMeta._count.likes }), {
    status: 201,
  });
};
