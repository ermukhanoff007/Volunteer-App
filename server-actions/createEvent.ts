"use server";

import { auth } from "@/auth/auth";
import { createEventSchema } from "@/schema/zod";
import prisma from "@/utils/prisma";
import { error } from "console";

export async function createEvent(data: unknown) {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user) throw new Error("Unauthorized");
    if (user.role !== "ORGANIZER") throw new Error("Access denied");

    const parsed = createEventSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error("Invalid values");
    }

    const form = parsed.data;

    await prisma.event.create({
      data: {
        title: form?.title,
        description: form?.description,
        date: new Date(form.date),
        location: form.location,
        image: form.image || null,
        organizerId: user.id,
      },
    });
    return { success: true, message: "Event created successfully" };
  } catch (error) {
    console.error("Error creating event");
    return { succes: false, message: (error as Error).message };
  }
}
