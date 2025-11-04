import prisma from "@/utils/prisma";

export async function getEvents() {
  return await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
  });
}
