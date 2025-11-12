"use server"
import {prisma } from "@/utils/prisma";

export async function getEvents() {
  return await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
  });
}


export async function getEventTitles() {
  const titles = await prisma.event.findMany({
    select:{
      title:true
    }
  })
  return titles.map(t=>t.title)
}
