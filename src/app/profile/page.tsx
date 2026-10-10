
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }

    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session, isPending, router]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        console.error("Profile update error:", error);
        toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      await authClient.getSession();
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSaving(false);
    }
  };

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
            আপনার অ্যাকাউন্টের তথ্য দেখুন এবং আপডেট করুন।
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                autoComplete="name"
                required
                className="w-full rounded-lg border border-green-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving || name.trim() === session.user.name}
              className="w-full rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
