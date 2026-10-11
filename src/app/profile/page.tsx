"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("প্রোফাইল দেখতে আগে সাইন ইন করুন");
      router.replace("/signin?callbackURL=/profile");
    }
  }, [session, isPending, router]);

  if (isPending || !session) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-green-50">
        <p className="text-green-800">প্রোফাইল লোড হচ্ছে...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-green-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <p className="text-sm font-semibold text-green-700">
            BAZARDOR ACCOUNT
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-gray-600">
            আপনার অ্যাকাউন্টের তথ্য দেখুন।
          </p>
        </div>

        <section className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-800">
              {(session.user.name || "U")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-xl font-semibold text-gray-900">
                {session.user.name || "User"}
              </h2>

              <p className="break-all text-sm text-gray-500">
                {session.user.email}
              </p>
            </div>
          </div>

          <dl className="mb-8 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-gray-500">Full Name</dt>
              <dd className="font-semibold text-gray-900">
                {session.user.name || "User"}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-gray-500">Email</dt>
              <dd className="break-all font-semibold text-gray-900">
                {session.user.email}
              </dd>
            </div>
          </dl>

          <Link
            href="/profile/update"
            className="block w-full rounded-lg bg-green-700 px-5 py-3 text-center font-semibold text-white transition hover:bg-green-800"
          >
            Update Information
          </Link>
        </section>
      </div>
    </main>
  );
}
