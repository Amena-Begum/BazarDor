
import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f1f8f3] px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm">
        <div className="text-7xl">🔎</div>

        <p className="mt-5 text-sm font-bold text-green-700">
          ERROR 404
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-[#183d32]">
          পণ্যটি পাওয়া যায়নি!
        </h1>

        <p className="mt-4 leading-7 text-gray-500">
          দুঃখিত, এই পণ্যের তথ্য আমাদের কাছে নেই।
          পণ্যের নাম বা URL পরীক্ষা করে আবার চেষ্টা করো।
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex rounded-xl bg-[#176b45] px-6 py-3 font-bold text-white hover:bg-[#105535]"
        >
          হোম পেজে ফিরে যাও
        </Link>
      </div>
    </main>
  );
}