"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInUser } from "../../services/sign-in";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if email and password are empty
    if (!email || !password) {
      alert("Email and password are required");
      setIsLoading(false);
      return;
    }

    try {
      const data = await signInUser({ email, password });
      console.log(data);

      if (data.email) {
        localStorage.setItem("email", data.email);
        router.push("/dashboard");
      } else {
        alert(data.message || "Invalid login");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      alert("An error occurred during sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-stone-50 p-8 shadow-md w-full max-w-md border-3 rounded-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <div className="mb-4">
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
            disabled={isLoading}
          />
        </div>
        <div className="mb-6">
          <label className="label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
            disabled={isLoading}
          />
        </div>
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-blue-500">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
