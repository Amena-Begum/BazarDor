"use client";

import { useEffect, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function AuthToast() {
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;

    const params = new URLSearchParams(window.location.search);
    const login = params.get("login");
    const signup = params.get("signup");
    const provider = params.get("provider");

    const isValidProvider =
      provider === "google" || provider === "github";

    const isLoginSuccess = login === "success";
    const isSignupSuccess = signup === "success";

    if (
      !isValidProvider ||
      (!isLoginSuccess && !isSignupSuccess)
    ) {
      return;
    }

    handled.current = true;

    const showToast = async () => {
      try {
        const result = await authClient.getSession();

        if (result.error || !result.data?.session) {
          toast.error("সাইন-ইন যাচাই করা যায়নি। আবার চেষ্টা করো।");
          return;
        }

        const providerName =
          provider === "google" ? "Google" : "GitHub";

        if (isSignupSuccess) {
          toast.success(
            `${providerName} দিয়ে অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!`
          );
        } else {
          toast.success(
            `${providerName} দিয়ে সফলভাবে সাইন ইন হয়েছে!`
          );
        }
      } catch (error) {
        console.error("AuthToast error:", error);
        toast.error("অ্যাকাউন্ট যাচাই করা যায়নি। আবার চেষ্টা করো।");
      } finally {
        window.history.replaceState(
          window.history.state,
          "",
          window.location.pathname
        );
      }
    };

    void showToast();
  }, []);

  return null;
}
