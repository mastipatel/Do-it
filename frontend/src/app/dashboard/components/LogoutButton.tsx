"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    router.push("/sign-in");
  };
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      router.push("/sign-in");
    }
  }, []);
  return (
    <button className="logoutbutton" onClick={handleLogout}>
      Logout
    </button>
  );
}
