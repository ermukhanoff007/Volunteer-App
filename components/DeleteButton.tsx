"use client";
import { deleteEvent } from "@/server-actions/deleteEvent";
import { useState } from "react";
import { Button } from "./ui/button";

export default function DeleteButton({ eventId }: { eventId: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    setIsLoading(true);
    await deleteEvent(eventId);
    setIsLoading(false);
  };
  return <Button onClick={handleDelete}>{isLoading ? "Deleting..." : "Delete Event"}</Button>;
}
