"use client";

import { Button } from "@/components/ui/button";
import { createEventSchema } from "@/schema/zod";
import { createEvent } from "@/server-actions/createEvent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Calendar } from "../ui/calendar";
import { useRouter } from "next/navigation";

type CreateEventFormData = z.infer<typeof createEventSchema>;

export default function CreateEvent({ onClose }: { onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEventFormData>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      location: "",
      image: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: CreateEventFormData) => {
    setIsLoading(true);
    await createEvent(data);
    setIsLoading(false);
    router.push("/events");
    onClose();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6 mt-10">
      <div className="grid grid-cols-1  gap-8 md:grid-cols-2 md:gap-20">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-black">Title</label>
            <input
              {...register("title")}
              type="text"
              className="mt-1 w-full border rounded-md p-2  text-black"
              placeholder="Write a title"
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold  text-black">Description</label>
            <input
              {...register("description")}
              type="text"
              className="mt-1 w-full border rounded-md p-2  text-black"
              placeholder="Write a description"
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold  text-black">Location</label>
            <input
              {...register("location")}
              type="text"
              className="mt-1 w-full border rounded-md p-2  text-black"
              placeholder="Write a location"
            />
            {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold  text-black">Image</label>
            <input
              {...register("image")}
              type="text"
              className="mt-1 w-full border rounded-md p-2  text-black"
              placeholder="Write image URL"
            />
            {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold  text-black">Date</label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  className="text-black"
                />
              )}
            />
          </div>
        </div>
      </div>
      <Button type="submit" disabled={isLoading} className="w-full font-bold tracking-wide ">
        {isLoading ? "Creating..." : "Create"}
      </Button>
    </form>
  );
}
