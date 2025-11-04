import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Invalid email").nonempty("Email is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const registerSchema = z
  .object({ email: z.email(), password: z.string().min(6), confirmPassword: z.string() })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const createEventSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.date(),
  location: z.string().min(4, "Location must be at least 4 charactres"),
  image: z.url("Invalid URL").optional().or(z.literal("")),
});
