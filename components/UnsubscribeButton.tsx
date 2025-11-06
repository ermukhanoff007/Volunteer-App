"use client";
import { unsubscribeEvent } from "@/server-actions/unsubscribeEvent";
import { useState } from "react";
import { Button } from "./ui/button";
import { IButtonProps } from "@/types/button.types";

export default function UnSubscribeButton({ userId, eventId }: IButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handleUnSubscribe = async () => {
    setIsLoading(true);
    await unsubscribeEvent(eventId, userId);
    setIsLoading(false);
  };

  return <Button onClick={handleUnSubscribe}>{isLoading ? "Unsubscribing" : "Unsubscribe"}</Button>;
}
