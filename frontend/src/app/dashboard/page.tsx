"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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
    <div>
      <button className="logoutbutton" onClick={handleLogout}>
        Logout
      </button>

      <div className="min-h-screen p-6 mb-3">
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4 text-center">My Chores</h1>
        </div>
      </div>
    </div>
  );
}
