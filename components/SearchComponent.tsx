"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@/components/ui/command";
import { getEventTitles, getEvents } from "@/server-actions/getEvents";
import { IEvent } from "@/types/event.types";

export default function Search() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      const data = await getEvents();
      setEvents(data);
    }
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(query.toLowerCase())
  );

  const goToEventDetails = (eventId: number) => {
    router.push(`/events/${eventId}`);
  };

  return (
    <div className="relative flex">
      <Command className="w-full">
        <CommandInput
          placeholder="Find Event"
          value={query}
          onValueChange={setQuery}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          className="w-full"
        />
        {isOpen && (
          <CommandList className="absolute top-full left-0 mt-1 w-full bg-white shadow-md rounded-md z-50">
            <CommandEmpty>No events found.</CommandEmpty>
            {filteredEvents.map((event) => (
              <CommandItem key={event.id} onSelect={() => goToEventDetails(event.id)} className="cursor-pointer active:bg-gray-100">
                {event.title}
              </CommandItem>
            ))}
          </CommandList>
        )}
      </Command>
    </div>
  );
}
