"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignInPage() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();

toast("Sign In authentication will be connected next.", {
  style: {
    background: "#111827",
    color: "#ffffff",
    border: "1px solid #374151",
  },
});
};

return ( <main className="flex min-h-screen items-center justify-center bg-[#0b1120] px-4 py-10 text-white"> <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111827] p-6 text-white shadow-xl sm:p-10">
{/* Logo and Heading */} 
<div className="mb-8 text-center"> 
      <h1 className="mb-2 text-3xl font-bold text-white">
        Sign In
      </h1>

      <p className="text-sm text-white/70">
        Welcome back! Please enter your details.
      </p>
    </div>

    {/* Sign In Form */}
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-white"
        >
          Email Address
        </label>

        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full border-white/20 bg-[#0b1120] text-white placeholder:text-gray-400 focus:border-primary focus:outline-none"
          autoComplete="email"
          required
        />
      </div>

      {/* Password */}
      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-white"
          >
            Password
          </label>

          <button
            type="button"
            className="text-xs font-semibold text-white hover:text-primary hover:underline"
            onClick={() =>
              toast("Password recovery will be added later.", {
                style: {
                  background: "#111827",
                  color: "#ffffff",
                },
              })
            }
          >
            Forgot password?
          </button>
        </div>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full border-white/20 bg-[#0b1120] pr-20 text-white placeholder:text-gray-400 focus:border-primary focus:outline-none"
            autoComplete="current-password"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white hover:text-primary"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* Sign In Button */}
      <button
        type="submit"
        className="btn btn-primary w-full text-white"
      >
        Sign In
      </button>
    </form>

    {/* Sign Up Link */}
    <p className="mt-6 text-center text-sm text-white/70">
      Don&apos;t have an account?{" "}
      <Link
        href="/signup"
        className="font-bold text-white hover:text-primary hover:underline"
      >
        Sign Up
      </Link>
    </p>

    {/* Back to Home */}
    <Link
      href="/"
      className="mt-6 block text-center text-sm text-white/70 hover:text-white"
    >
      ← Back to Home
    </Link>
  </div>
</main>

);
}
