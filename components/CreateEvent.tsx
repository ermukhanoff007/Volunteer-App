"use client";

import { Button } from "@/components/ui/button";
import { createEventSchema } from "@/schema/zod";
import { createEvent } from "@/server-actions/createEvent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type CreateEventFormData = z.infer<typeof createEventSchema>;

export default function CreateEvent() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEventFormData>({
    resolver: zodResolver(createEventSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: CreateEventFormData) => {
    setIsLoading(true);
    const result = await createEvent(data);
    console.log(result);

    setIsLoading(false);
  };
  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4"
      >
        <h2 className="text-black">Create Event</h2>
        <div>
          <label className="block text-sm font-medium text-black">Title</label>
          <input
            type="text"
            {...register("title")}
            className="mt-1 w-full border rounded-md p-2 text-black"
            placeholder="Write a title"
          />
          {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-black">Description</label>
          <input
            type="text"
            {...register("description")}
            className="mt-1 w-full border rounded-md p-2 text-black"
            placeholder="Write a description"
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-black">Date</label>
          <input
            type="date"
            {...register("date")}
            className="mt-1 w-full border rounded-md p-2 text-black"
            placeholder="Write a date"
          />
          {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-black">Location</label>
          <input
            type="text"
            {...register("location")}
            className="mt-1 w-full border rounded-md p-2 text-black"
            placeholder="Write a location"
          />
          {errors.location && (
            <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-black">Image</label>
          <input
            type="text"
            {...register("image")}
            className="mt-1 w-full border rounded-md p-2 text-black"
            placeholder="Write URL of an image"
          />
          {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image.message}</p>}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full font-bold tracking-wide">
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </form>
    // </div>
  );
}
