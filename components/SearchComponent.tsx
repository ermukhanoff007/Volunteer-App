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
import { getEventTitles } from "@/server-actions/getEvents";

export default function Search() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    async function fetchTittles() {
      const data = await getEventTitles();
      setEvents(data);
    } fetchTittles()
  },[]);

  const filtered = events.filter((event) => event.toLowerCase().includes(query.toLowerCase()));

  const goToEvent = (eventName: string) => {
    const slug = eventName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/events/${slug}`);
    setIsOpen(false);
  };

  return (
    <div className="relative w-80">
      <Command>
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
            {filtered.map((event) => (
              <CommandItem key={event} onSelect={() => goToEvent(event)}>
                {event}
              </CommandItem>
            ))}
          </CommandList>
        )}
      </Command>
    </div>
  );
}
