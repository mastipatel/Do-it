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

      <div className="min-h-screen p-6 mb-3 bg-green-50">
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow ">
          <h1 className="text-2xl font-bold mb-4 text-center ">ALL CHORES</h1>
        </div>

        <Board />
      </div>
    </div>
  );
}
