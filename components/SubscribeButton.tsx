"use client";

import { subscribeEvent } from "@/server-actions/subscribeEvent";
import { Button } from "./ui/button";
import { useState } from "react";

interface IProps {
  userId: string;
  eventId: number;
}

export default function SubscribeButton({ userId, eventId }: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubscribe = async () => {
    setIsLoading(true);
    await subscribeEvent(eventId, userId);
    setIsLoading(false);
  };

  return <Button onClick={handleSubscribe}>{isLoading ? "Subscribing" : "Subscribe"}</Button>;
}
