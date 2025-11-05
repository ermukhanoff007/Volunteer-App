"use client";

import SubscribeButton from "@/components/SubscribeButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface IEvent {
  id: number;
  title: string;
  description: string;
  location: string;
  date: Date;
  image: string | null;
}

interface IUser {
  id: string;
}

export default function EventsList({ events, user }: { events: IEvent[]; user: IUser | null }) {
  return (
    <div className="flex justify-center items-center">
      {events.length === 0 && <p>No events</p>}
      <div className="grid grid-cols-2 p-4 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="w-full flex flex-col items-center  justify-center rounded-xl p-4 bg-amber-50 gap-3 shadow-2xl"
          >
            {event.image && (
              <Image
                src={event.image}
                alt="event-image"
                width={300}
                height={200}
                className="rounded-xl"
              />
            )}
            <p>{event.title}</p>
            <div className="bg-amber-100 flex flex-col p-4 rounded-xl wrap-break-word">
              <p>Description:</p>
              <p className="wrap-break-word">{event.description}</p>
            </div>
            <p>{event.location}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            {user ? (
              <SubscribeButton eventId={event.id} userId={user.id} />
            ) : (
              <Button>Log in to subscribe</Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
