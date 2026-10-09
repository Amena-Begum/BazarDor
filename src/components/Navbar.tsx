
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const categories = [
  { name: "সব পণ্য", slug: "" },
  { name: "চাল", slug: "chal" },
  { name: "ডাল", slug: "dal" },
  { name: "তেল", slug: "tel" },
  { name: "সবজি", slug: "sobji" },
  { name: "মাছ", slug: "mach" },
  { name: "মাংস", slug: "mangsho" },
  { name: "ডিম", slug: "dim" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const date = new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="border-b border-[#e5eee7] bg-white">
      {/* Top row */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">


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

        {/* Desktop auth buttons */}
        <div className="hidden items-center gap-2 sm:flex">
          <Link
            href="/signin"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-green-50"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            সাইন আপ
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
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
          {categories.map((category) => {
            const href = category.slug
              ? `/category/${category.slug}`
              : "/";

            const active = category.slug
              ? pathname === href
              : pathname === "/";

            return (
              <Link
                key={category.slug}
                href={href}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${active
                  ? "bg-green-100 text-green-800"
                  : "text-gray-600 hover:bg-green-50 hover:text-green-800"
                  }`}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav className="border-t border-[#e5eee7] bg-white p-4 md:hidden">
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => {
              const href = category.slug
                ? `/category/${category.slug}`
                : "/";

              const active = category.slug
                ? pathname === href
                : pathname === "/";

              return (
                <Link
                  key={category.slug}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-3 py-3 text-sm font-semibold ${active
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-50 text-gray-700"
                    }`}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-gray-100 pt-3 sm:hidden">
            <Link
              href="/signin"
              onClick={() => setMenuOpen(false)}
              className="btn btn-outline btn-sm"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className="btn btn-primary btn-sm"
            >
              সাইন আপ
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}