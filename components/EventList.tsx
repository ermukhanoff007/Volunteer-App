"use client";

import SubscribeButton from "@/components/SubscribeButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import Link from "next/link";
import { IEventProps } from "@/types/event.types";

export default function EventsList({ events, user, session }: IEventProps) {
  return (
    <div className="flex justify-center items-center">
      {events.length === 0 && <p>No events</p>}
      <div className="grid grid-cols-2 p-4 gap-4 ">
        {events.map((event) => (
          <div
            key={event.id}
            className="w-full flex flex-col items-center  justify-center rounded-xl p-4 bg-amber-50 gap-3 shadow-2xl transition-transform duration-300 ease-in-out hover:scale-102"
          >
            {event.image && (
              <Image
                src={event.image}
                alt="event-image"
                width={300}
                height={150}
                className="rounded-xl h-[200px] "
              />
            )}
            <p>{event.title}</p>
            <div className="bg-amber-100 flex flex-col p-4 rounded-xl items-start w-full">
              <p>Description:</p>
              <p>{event.description}</p>
            </div>
            <p>{event.location}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            {session?.user.role === "USER" && (
              <SubscribeButton eventId={event.id} userId={session.user.id} />
            )}
            {session?.user.role === "ORGANIZER" && <DeleteButton eventId={event.id} />}
            {!user && (
              <div className="flex gap-2">
                <Link href="/register">
                  <Button>Log in to Subscribe</Button>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
