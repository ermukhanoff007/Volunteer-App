"use client";

import Image from "next/image";
import { useEventStore } from "@/store/eventStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IEventProps } from "@/types/event.types";

export default function EventsList({ events }: IEventProps) {
  const { setEvents, filteredEvents, cityFilter } = useEventStore();
  const router = useRouter();

  useEffect(() => {
    setEvents(events);
  }, [events, setEvents]);

  const goToEventDetails = (eventId: number) => {
    router.push(`/events/${eventId}`);
  };

  return (
    <div className="w-full flex justify-center px-4 sm:py-8">
      {filteredEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[600px]">
          <p className="text-gray-500 text-lg italic">
            No events {cityFilter && `in ${cityFilter}`}
          </p>
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ${
            filteredEvents.length === 1 ? "w-screen" : "w-full"
          }`}
        >
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group relative bg-white rounded-2xl w-full shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer border border-gray-100"
              onClick={() => goToEventDetails(event.id)}
            >
              {event.image && (
                <div className="relative w-full h-80">
                  <Image
                    src={event.image}
                    alt="event-image"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              <div className="p-5 flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">{event.title}</h3>

                <div className="bg-amber-50 p-3 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1 font-medium">Description:</p>
                  <p className="text-gray-700 text-sm line-clamp-3">{event.description}</p>
                </div>

                <div className="flex flex-col gap-1 text-sm text-gray-600">
                  <p className="flex items-center gap-1">
                    📍 <span>{event.location}</span>
                  </p>
                  <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
