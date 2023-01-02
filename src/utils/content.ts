import { prisma } from "lib/prisma";

export const getViewsAndLike = async (slug: string) => {
  const viewsAndLike = await prisma.post.findUnique({
    where: { slug },
    select: { views: true, _count: { select: { likes: true } } },
  });

  return { views: viewsAndLike?.views ?? 0, likes: viewsAndLike?._count.likes ?? 0 };
};
