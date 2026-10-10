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

  // function handleForgotPassword() {
  //   toast("পাসওয়ার্ড রিকভারি সুবিধা এখনো যোগ করা হয়নি।");
  // }

  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    console.log(data)
  };
  const handleGithubSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "github"
    });
  };
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
            {/* <button
              type="button"
              onClick={handleForgotPassword}
              className="cursor-pointer text-xs font-semibold text-green-700 hover:underline"
            >
              পাসওয়ার্ড ভুলে গেছ?
            </button> */}
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

          {/* Divider: OR */}
          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-300" />

            <span className="text-sm font-medium text-gray-500">
              or
            </span>

            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-green-600 hover:bg-green-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-5 w-5 shrink-0"
              aria-hidden="true"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                transform="translate(0 4)"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.66 5.94c4.47-4.13 7.11-10.2 7.11-17.59Z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
                transform="translate(1 0)"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.91-5.86l-7.66-5.94c-2.13 1.43-4.86 2.3-8.25 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                transform="translate(0 -2)"
              />
            </svg>

            <span>Sign In with Google</span>
          </button>

          <button
            onClick={handleGithubSignIn}
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-green-900/15 bg-white px-5 py-3.5 font-semibold text-gray-800 shadow-sm transition-all duration-300 hover:border-green-700 hover:bg-green-50 hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 text-gray-900"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.467-1.11-1.467-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.091-.646.35-1.087.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.701 1.027 1.595 1.027 2.688 0 3.847-2.338 4.695-4.566 4.944.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z"
                clipRule="evenodd"
              />
            </svg>

            <span>Sign in with GitHub</span>
          </button>

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
