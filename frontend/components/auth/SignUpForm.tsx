"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpUser } from "../../services/sign-up";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await signUpUser({ email, password });
      console.log(data);

      if (data.email) {
        localStorage.setItem("email", data.email);
        router.push("/dashboard");
      } else {
        alert(data.message || "Sign up failed");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      alert("An error occurred during sign up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2 className="form-heading">Sign Up</h2>
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
            minLength={4}
          />
        </div>
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/sign-in" className="text-blue-500">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
