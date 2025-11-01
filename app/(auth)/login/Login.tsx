"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signInWithCredentials } from "@/server-actions/sign-in";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string(),
});
type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const router = useRouter();
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await signInWithCredentials(data.email, data.password);
      if (!result.error) {
        router.push("/");
      } else {
        console.error("Sign in error");
      }
      console.log("result", result);
    } catch (error) {
      console.error("Sign in error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4"
      >
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
        <Button type="submit" disabled={isLoading} className="w-full font-bold tracking-wide">
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex flex-col items-center">
            <span>Do not have an account ?</span>
            <Link href="/register" className="underline text-blue-600">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
