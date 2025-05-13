"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Board from "./components/Board";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
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
    <div className="bg-gray-100">
      <button className="logoutbutton" onClick={handleLogout}>
        Logout
      </button>

      <div className="min-h-screen p-6 mb-3 flex flex-col items-center bg-custom-background">
        <div className="max-w-xl mx-auto bg-blue-300 bg-custom-card p-5 rounded shadow">
          <h1 className="text-custom-header font-bold text-xl">ALL CHORES</h1>
        </div>

        <Board />
      </div>
    </div>
  );
}
