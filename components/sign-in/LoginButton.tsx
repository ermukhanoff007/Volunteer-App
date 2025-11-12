"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "../ui/button";

export default function SignIn() {
  return (
    <button className="flex gap-4 mt-4 " onClick={() => signIn("google")}>
       <Image src="/google.png" alt="google logo" width={25} height={15}/>
      Sign in with Google
    </button>
  );
}
