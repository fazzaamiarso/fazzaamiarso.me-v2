import type { APIRoute } from "astro";
import { prisma } from "lib/prisma";

export const post: APIRoute = async ({ request }) => {
  const body = await request.json();
  const userIp = body.ip;
  const slug = body.slug;

  const like = await prisma.like.create({ data: { userIp, Post: { connect: { slug } } } });

  return new Response(JSON.stringify({ like }), { status: 200 });
};

export const get: APIRoute = async ({ request }) => {
  const queryParams = new URL(request.url).searchParams;
  const slug = queryParams.get("slug") as string;

  const likes = await prisma.like.count({ where: { Post: { slug } } });

  return new Response(JSON.stringify({ likes }), { status: 200 });
};
