
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  UserRound,
  LogOut,
  UserCircle,
  ChevronDown,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const categories = [
  { name: "সব পণ্য", slug: "", icon: "🛒" },
  { name: "চাল", slug: "chal", icon: "🍚" },
  { name: "ডাল", slug: "dal", icon: "🫘" },
  { name: "তেল", slug: "tel", icon: "🫗" },
  { name: "সবজি", slug: "sobji", icon: "🥦" },
  { name: "মাছ", slug: "mach", icon: "🐟" },
  { name: "মাংস", slug: "mangsho", icon: "🍗" },
  { name: "ডিম", slug: "dim", icon: "🥚" },
  { name: "মসলা", slug: "moshla", icon: "🌶️" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const date = new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("Logout করা যায়নি। আবার চেষ্টা করো।");
        return;
      }

      setProfileMenuOpen(false);
      setMenuOpen(false);

      toast.success("সফলভাবে Logout হয়েছে!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoggingOut(false);
    }
  }

  function closeMenus() {
    setMenuOpen(false);
    setProfileMenuOpen(false);
  }

  function getCategoryHref(slug: string) {
    return slug ? `/category/${slug}` : "/";
  }

  function isCategoryActive(slug: string) {
    const href = getCategoryHref(slug);
    return slug ? pathname === href : pathname === "/";
  }

  function AuthButtons({ mobile = false }: { mobile?: boolean }) {
    if (isPending) {
      return (
        <span className="loading loading-spinner loading-sm text-green-700" />
      );
    }

    if (user) {
      return (
        <div className={mobile ? "w-full" : "relative"}>
          {/* User name and icon */}
          <button
            type="button"
            onClick={() => setProfileMenuOpen((prev) => !prev)}
            aria-expanded={profileMenuOpen}
            aria-haspopup="menu"
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left transition hover:bg-green-50 ${
              mobile ? "w-full border border-green-100" : ""
            }`}
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800">
              <UserRound size={20} />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-xs text-gray-500">
                স্বাগতম
              </span>
              <span className="block max-w-40 truncate text-sm font-bold text-green-900">
                {user.name || user.email}
              </span>
            </span>

            <ChevronDown
              size={17}
              className={`shrink-0 text-green-800 transition-transform ${
                profileMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Profile dropdown */}
          {profileMenuOpen && (
            <div
              role="menu"
              className={`z-50 rounded-xl border border-green-100 bg-white p-2 shadow-lg ${
                mobile
                  ? "mt-2 w-full"
                  : "absolute right-0 top-full mt-2 w-52"
              }`}
            >
              <div className="mb-2 border-b border-gray-100 px-3 py-2">
                <p className="text-xs text-gray-500">
                  লগইন করা হয়েছে
                </p>
                <p className="truncate text-sm font-semibold text-gray-800">
                  {user.email}
                </p>
              </div>

              <Link
                href="/profile"
                role="menuitem"
                onClick={closeMenus}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-800"
              >
                <UserCircle size={18} />
                Profile
              </Link>

              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loggingOut ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <LogOut size={18} />
                )}
                {loggingOut ? "Logout হচ্ছে..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        className={
          mobile
            ? "grid w-full grid-cols-2 gap-2"
            : "flex items-center gap-2"
        }
      >
        <Link
          href="/signin"
          onClick={closeMenus}
          className="rounded-lg px-4 py-2 text-center text-sm font-semibold text-gray-700 transition hover:bg-green-50"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          onClick={closeMenus}
          className="rounded-lg bg-green-700 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-green-800"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <header className="relative z-40 border-b border-[#e5eee7] bg-white">
      {/* Top row */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          onClick={closeMenus}
          className="flex shrink-0 items-center gap-3"
        >
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-700 to-emerald-900 p-2 shadow-md shadow-green-900/20 ring-1 ring-green-600/20 transition duration-300 hover:scale-105 hover:shadow-lg">
            <Image
              src="/images/logo-icon.png"
              alt="বাজার দর লোগো"
              width={36}
              height={36}
              priority
              className="size-full object-contain"
            />
          </div>

          <span>
            <span className="block text-xl font-extrabold text-green-800">
              বাজার দর
            </span>
            <span className="block text-xs text-gray-500">
              {date}
            </span>
          </span>
        </Link>

        {/* Desktop authentication */}
        <div className="hidden items-center gap-2 sm:flex">
          <AuthButtons />
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => {
            setMenuOpen((prev) => !prev);
            setProfileMenuOpen(false);
          }}
          className="btn btn-ghost btn-square sm:hidden"
          aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Desktop categories */}
      <nav className="hidden border-t border-[#f0f4f0] md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 overflow-x-auto px-4 py-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={getCategoryHref(category.slug)}
              onClick={closeMenus}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${
                isCategoryActive(category.slug)
                  ? "bg-green-100 text-green-800"
                  : "text-gray-600 hover:bg-green-50 hover:text-green-800"
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav className="border-t border-[#e5eee7] bg-white p-4 md:hidden">
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={getCategoryHref(category.slug)}
                onClick={closeMenus}
                className={`rounded-lg px-3 py-3 text-sm font-semibold ${
                  isCategoryActive(category.slug)
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-50 text-gray-700"
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className="mt-3 border-t border-gray-100 pt-3">
            <AuthButtons mobile />
          </div>
        </nav>
      )}
    </header>
  );
}
