import Link from "next/link";
import { notFound } from "next/navigation";
import type { Product } from "../../../types/product";
import CategoryProducts from "../../category/[slug]/CategoryProducts";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

async function getCategoryProducts(
  slug: string,
): Promise<Product[]> {
  const url = new URL(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );

  url.searchParams.set("category", slug);

  const response = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("API থেকে সঠিক পণ্যের তথ্য পাওয়া যায়নি।");
  }

  return data as Product[];
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  let products: Product[];

  try {
    products = await getCategoryProducts(slug);
  } catch (error) {
    console.error("Category API error:", error);

    return (
      <main className="min-h-screen bg-[#f1f8f3] px-4 py-16">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm">
          <p className="text-4xl">⚠️</p>

          <h1 className="mt-4 text-2xl font-extrabold text-[#183d32]">
            পণ্যের তথ্য পাওয়া যাচ্ছে না
          </h1>

          <p className="mt-3 text-gray-500">
            ইন্টারনেট সংযোগ বা সার্ভারে সমস্যা হতে পারে।
            কিছুক্ষণ পর আবার চেষ্টা করো।
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-[#176b45] px-5 py-3 font-bold text-white hover:bg-[#105535]"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  if (products.length === 0) {
    notFound();
  }

  const categoryName = products[0].categoryNameBn;
  const categoryIcon = products[0].categoryIcon || "🛒";

  return (
    <main className="min-h-screen bg-[#f1f8f3] px-4 py-8 text-[#183d32] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-[#e2f4e8] to-white p-6 sm:p-8">
          <p className="text-sm font-semibold text-green-700">
            বাজার দর / ক্যাটাগরি
          </p>

          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            {categoryIcon} {categoryName}
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            {categoryName} বিভাগের সব পণ্যের আজকের বাজারদর
            দেখুন এবং আপনার প্রয়োজন অনুযায়ী দাম সাজান।
          </p>
        </div>

        <CategoryProducts products={products} />
      </div>
    </main>
  );
}

