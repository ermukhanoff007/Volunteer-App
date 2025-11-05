"use server";
import prisma from "@/utils/prisma";

export async function unsubscribeEvent(eventId:number, userId:string){
    return await prisma.participation.delete({
        where :{
            userId_eventId:{
                userId,
                eventId
            }
        }
    })
}