"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(
          error.message || "সাইন ইন করা যায়নি। আবার চেষ্টা করো।"
        );
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");

      const searchParams = new URLSearchParams(window.location.search);
      const callbackURL = searchParams.get("callbackURL");

      const destination =
        callbackURL &&
          callbackURL.startsWith("/") &&
          !callbackURL.startsWith("//")
          ? callbackURL
          : "/";

      router.replace(destination);
      router.refresh();
    } catch (error) {
      console.error("Sign in error:", error);

      toast.error(
        "সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করো।"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleForgotPassword() {
    toast("পাসওয়ার্ড রিকভারি সুবিধা এখনো যোগ করা হয়নি।");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f1f8f3] px-4 py-10">
      <div className="card w-full max-w-md border border-green-100 bg-white shadow-lg">
        <div className="card-body p-6 sm:p-8">
          {/* Brand */}
          <Link
            href="/"
            className="mx-auto inline-flex items-center gap-2 text-lg font-extrabold text-green-800 hover:text-green-700"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-xl">
              🛒
            </span>
            Bazar-Dor
          </Link>

          {/* Heading */}
          <div className="mt-5 text-center">
            <h1 className="text-3xl font-extrabold text-green-900">
              স্বাগতম!
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              তোমার অ্যাকাউন্টে সাইন ইন করো
            </p>
          </div>

          {/* Sign In Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-5 space-y-4"
          >
            {/* Email */}
            <div className="form-control w-full">
              <label htmlFor="email" className="label">
                <span className="label-text font-semibold text-gray-700">
                  ইমেইল ঠিকানা
                </span>
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full border-green-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div className="form-control w-full">
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="password" className="label">
                  <span className="label-text font-semibold text-gray-700">
                    পাসওয়ার্ড
                  </span>
                </label>

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="cursor-pointer text-xs font-semibold text-green-700 hover:underline"
                >
                  পাসওয়ার্ড ভুলে গেছ?
                </button>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="তোমার পাসওয়ার্ড দাও"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full border-green-200 bg-white pr-20 text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-sm font-semibold text-green-700 hover:text-green-900"
                  aria-label={
                    showPassword
                      ? "পাসওয়ার্ড লুকাও"
                      : "পাসওয়ার্ড দেখাও"
                  }
                >
                  {showPassword ? "লুকাও" : "দেখাও"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn w-full border-0 bg-green-700 text-white hover:bg-green-800 disabled:bg-green-400"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  সাইন ইন হচ্ছে...
                </>
              ) : (
                "সাইন ইন"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-5 text-center text-sm text-gray-600">
            এখনো অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-bold text-green-700 hover:text-green-900 hover:underline"
            >
              অ্যাকাউন্ট তৈরি করো
            </Link>
          </p>

          {/* Back to Home */}
          <Link
            href="/"
            className="mt-2 text-center text-sm text-gray-500 hover:text-green-700 hover:underline"
          >
            ← হোম পেজে ফিরে যাও
          </Link>

          {/* Footer */}
          <p className="mt-5 border-t border-green-100 pt-4 text-center text-xs text-gray-400">
            তোমার প্রতিদিনের বাজার, এখন আরও সহজ
          </p>
        </div>
      </div>
    </main>
  );
}
