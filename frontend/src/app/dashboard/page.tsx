"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Board from "./components/Board";

export default function DashboardPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const email = localStorage.getItem("email");
    if (!email) {
      router.push("/sign-in");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/sign-in");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-6">
      <div className="w-full max-w-7xl px-4 relative">
        <button className="logoutbutton" onClick={handleLogout}>
          Logout
        </button>

        <h1 className="text-2xl font-semibold text-center text-gray-600 mb-8">
          All chores
        </h1>

        {/* Board */}
        {isClient && <Board />}
      </div>
    </div>
  );
}
