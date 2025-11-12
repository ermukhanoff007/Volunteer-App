"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { registerForm } from "@/server-actions/register";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignIn from "@/components/sign-in/LoginButton";

const registerSchema = z
  .object({
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    const result = await registerForm(data);
    if (!result.error) {
      router.push("/login");
    } else {
      setServerError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Volunteer App</h2>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 w-full border rounded-md p-2"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 w-full border rounded-md p-2"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="mt-1 w-full border rounded-md p-2"
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
          {serverError && <p className="text-sm text-red-500 mt-1">{serverError}</p>}
          <Button type="submit" disabled={isLoading} className="w-full font-bold tracking-wide">
            {isLoading ? "Registering..." : "Register"}
          </Button>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="flex flex-col items-center">
              <span>Already have an account ?</span>
              <Link href="/login" className="underline text-blue-600">
                Log in
              </Link>
            </div>
          </div>
        </form>
        <div className="w-full flex justify-center">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
