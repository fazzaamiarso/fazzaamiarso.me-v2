import type { APIRoute } from "astro";
import { prisma } from "lib/prisma";

const LIKE_LIMITS = 5;
export const post: APIRoute = async ({ clientAddress, request }) => {
  const userIp = clientAddress;
  const slug = (await request.json()).slug as string;

  const myLikes = await prisma.like.count({ where: { userIp, postSlug: slug } });
  if (myLikes >= LIKE_LIMITS)
    return new Response(JSON.stringify({ message: "Limits Reached!" }), { status: 403 });

  const like = await prisma.like.create({ data: { userIp, Post: { connect: { slug } } } });

  return new Response(JSON.stringify({ like }), { status: 201 });
};

export const get: APIRoute = async ({ clientAddress, request }) => {
  const userIp = clientAddress;
  const searchParams = new URL(request.url).searchParams;
  const slug = searchParams.get("slug") as string;

  const myLikes = await prisma.like.count({ where: { userIp, postSlug: slug } });
  const likes = await prisma.like.count({ where: { Post: { slug } } });

  return new Response(JSON.stringify({ likes, myLikes }), { status: 200 });
};
