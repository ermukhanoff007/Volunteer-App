"use client";
import { unsubscribeEvent } from "@/server-actions/unsubscribeEvent";
import { useState } from "react";
import { Button } from "./ui/button";

interface IProps {
  userId: string;
  eventId: number;
}
export default function UnSubscribeButton({ userId, eventId }: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handleUnSubscribe = async () => {
    console.log("click")
    setIsLoading(true);
    await unsubscribeEvent(eventId, userId);
    setIsLoading(false);
    
  };

  return <Button onClick={handleUnSubscribe}>{isLoading ? "Unsubscribing" : "Unsubscribe"}</Button>;
}
