"use client";

import { subscribeEvent } from "@/server-actions/subscribeEvent";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { isUserSubscribed } from "@/server-actions/isSubscribed";
import { unsubscribeEvent } from "@/server-actions/unsubscribeEvent";
import { useRouter } from "next/navigation";
import { IButtonProps } from "@/types/button.types";

export default function SubscribeButton({ userId, eventId }: IButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSub, setIsSub] = useState(false);
  const router = useRouter();
  useEffect(() => {
    async function checkSub() {
      const sub = await isUserSubscribed(eventId, userId);
      setIsSub(sub);
      setIsLoading(false);
    }
    checkSub();
  }, [eventId, userId]);

  const handleSubscribe = async () => {
    setIsLoading(true);
    if (isSub) {
      await unsubscribeEvent(eventId, userId);
      setIsSub(false);
    } else {
      await subscribeEvent(eventId, userId);
      setIsSub(true);
    }
    setIsLoading(false);
    router.refresh();
  };
  if (isLoading) return <Button disabled>Loading...</Button>;
  return (
    <Button onClick={handleSubscribe} disabled={isLoading}>
      {isSub ? "Unsubscribe" : "Subscribe"}
    </Button>
  );
}
