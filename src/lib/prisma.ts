import type { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

import("@prisma/client").then((mod) => (prisma = new mod.PrismaClient()));

export { prisma };
