import { IEvent, ISession, IUser } from "@/types/event.types";
import Image from "next/image";
import SubscribeButton from "./SubscribeButton";
import DeleteButton from "./DeleteButton";
import Link from "next/link";
import { Button } from "../ui/button";

export default async function EventPage({
  event,
  user,
  session,
}: {
  event: IEvent;
  user: IUser | null;
  session: ISession | null;
}) {
  return (
    <div className="flex flex-col items-center justify-center bg-amber-50 py-10 px-4 min-h-screen">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 md:p-10 transition-transform duration-300 hover:-translate-y-1">
        {event.image && (
          <div className="relative w-full h-64 md:h-80 mb-6 overflow-hidden rounded-xl">
            <Image
              src={event.image}
              alt="event-image"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
          {event.title}
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-6 text-justify">
          {event.description}
        </p>

        <div className="bg-amber-100 rounded-xl p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2 text-gray-700">
          <p className="flex items-center gap-2">
            📅 <span className="font-medium">Date:</span> {event.date.toLocaleDateString()}
          </p>
          <p className="flex items-center gap-2">
            📍 <span className="font-medium">Location:</span> {event.location}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-end sm:justify-between items-center gap-3 mt-8">
          {session?.user.role === "USER" && (
            <SubscribeButton eventId={event.id} userId={session.user.id} />
          )}
          {session?.user.role === "ORGANIZER" && <DeleteButton eventId={event.id} />}
          {!user && (
            <Link href="/register" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium">
                Log in to Subscribe
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
