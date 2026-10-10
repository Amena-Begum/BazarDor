"use client";

import { useState } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    //     e.preventDefault();
    //     setLoading(true);
    //     const formData = new FormData(e.currentTarget)
    //     const user = Object.fromEntries(formData.entries())
    //     const { data, error } = await authClient.signUp.email({
    //         ...user
    //     callbackURL: "/"
    //     })
    //     if(data){
    //         console.log(data)
    //     } 
    //     if(error){
    //         console.log(error)
    //     }
    //     try {
    //         const { error } = await authClient.signUp.email({
    //             name,
    //             email,
    //             password,
    //         });

    //         if (error) {
    //             toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
    //             return;
    //         }

    //         toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
    //         router.push("/");
    //         router.refresh();
    //     } catch {
    //         toast.error("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        try {
            const { data, error } = await authClient.signUp.email({
                name: String(user.name),
                email: String(user.email),
                password: String(user.password),
                callbackURL: "/",
            });
  console.log(data)
  console.log(error)
            // if (error) {
            //     toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
            //     console.error("Sign up error:", error);
            //     return;
            // }

            if (data) {
                toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
                router.push("/");
                router.refresh();
                redirect("/")
            }
            if (error) {
                // console.error("Full sign-up result:", result);
                console.error("Error object:", error);
                console.error("Error keys:", Object.keys(error));

                toast.error(
                    typeof error === "object" && error !== null && "message" in error
                        ? String(error.message)
                        : "অ্যাকাউন্ট তৈরি করা যায়নি। Terminal ও Network tab চেক করো।"
                );

                // return;
            }


        } catch (error) {
            console.error("Sign up error:", error);
            toast.error("সমস্যা হয়েছে। আবার চেষ্টা করো।");
        } finally {
            setLoading(false);
        }
    }


    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f1f8f3] px-4 py-10">
            <div className="w-full max-w-md rounded-3xl border border-green-100 bg-white p-6 shadow-lg sm:p-8">

                <Link
                    href="/"
                    className="cursor-pointer text-sm font-semibold text-green-700 hover:underline"
                >
                    ← হোমে ফিরে যাও
                </Link>

                <div className="mt-6 text-center">
                    <h1 className="text-3xl font-extrabold text-green-900">
                        অ্যাকাউন্ট তৈরি করো
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        বাজার দর-এর সঙ্গে যুক্ত হও
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-1 block text-sm font-semibold"
                        >
                            তোমার নাম
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="তোমার পুরো নাম"
                            className="input input-bordered w-full border-green-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1 block text-sm font-semibold"
                        >
                            ইমেইল
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="input input-bordered w-full border-green-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-1 block text-sm font-semibold"
                        >
                            পাসওয়ার্ড
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            minLength={8}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="input input-bordered w-full border-green-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn w-full cursor-pointer border-0 bg-green-700 text-white hover:bg-green-800"
                    >
                        {loading
                            ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                            : "সাইন আপ"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    আগে থেকেই অ্যাকাউন্ট আছে?{" "}

                    <Link
                        href="/signin"
                        className="cursor-pointer font-bold text-green-700 hover:underline"
                    >
                        সাইন ইন করো
                    </Link>
                </p>
            </div>
        </main>
    );
}
