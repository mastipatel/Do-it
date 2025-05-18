"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  }, []);
  return null;
}
