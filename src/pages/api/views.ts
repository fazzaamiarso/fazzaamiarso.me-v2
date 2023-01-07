import type { APIRoute } from "astro";
import { prisma } from "lib/prisma";
import { getViewsAndLike } from "utils/content";

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

export const get: APIRoute = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const slug = searchParams.get("slug") as string;

  const { views, likes } = await getViewsAndLike(slug);

  return new Response(JSON.stringify({ views, likes }), { status: 200 });
};

