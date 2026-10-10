
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import type { Product } from "../../../types/product";

type Props = {
  slug: string;
};

export default function ProductDetailsClient({ slug }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const loadProduct = useCallback(async (isRetry = false) => {
    setLoading(true);
    setError(false);
    setNotFound(false);

    try {
      const response = await fetch(
        `/api/products/${encodeURIComponent(slug)}`,
        { cache: "no-store" }
      );

      if (response.status === 404) {
        setProduct(null);
        setNotFound(true);
        return;
      }

      if (!response.ok) {
        throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
      }

      const data: Product = await response.json();

      setProduct(data);

      if (isRetry) {
        toast.success("পণ্যের তথ্য পাওয়া গেছে!");
      }
    } catch {
      setProduct(null);
      setError(true);
      toast.error("পণ্যের তথ্য লোড করা যায়নি।");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    void loadProduct();
  }, [loadProduct]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("bn-BD", {
      maximumFractionDigits: 2,
    }).format(price);

  if (loading) {
    return (
      <main className="min-h-[60vh] p-8 text-center">
        <p className="text-lg font-semibold">
          পণ্যের তথ্য লোড হচ্ছে...
        </p>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
        <div className="max-w-lg text-center">
          <p className="text-6xl">🔎</p>
          <h1 className="mt-5 text-3xl font-extrabold">
            পণ্য পাওয়া যায়নি
          </h1>
          <p className="mt-3 text-gray-500">
            এই পণ্যটি আমাদের API-তে পাওয়া যায়নি।
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-green-700 px-6 py-3 font-bold text-white"
          >
            হোম পেজে ফিরে যাও
          </Link>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
        <div className="max-w-lg text-center">
          <p className="text-6xl">⚠️</p>
          <h1 className="mt-5 text-2xl font-extrabold">
            তথ্য লোড করা যায়নি
          </h1>
          <p className="mt-3 text-gray-500">
            ইন্টারনেট বা সার্ভারে সমস্যা হতে পারে।
          </p>
          <button
            onClick={() => void loadProduct(true)}
            className="mt-6 rounded-xl bg-green-700 px-6 py-3 font-bold text-white hover:bg-green-800"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </main>
    );
  }

  const prices = [
    { label: "আজকের দাম", value: product.today },
    { label: "গতকালের দাম", value: product.yesterday },
    { label: "গত সপ্তাহের দাম", value: product.lastWeek },
    { label: "গত মাসের দাম", value: product.lastMonth },
  ];

  const changeColor =
    product.change.dir === "up"
      ? "text-red-600"
      : product.change.dir === "down"
        ? "text-green-700"
        : "text-gray-500";

  const changeText =
    product.change.dir === "up"
      ? "দাম বেড়েছে"
      : product.change.dir === "down"
        ? "দাম কমেছে"
        : "দাম অপরিবর্তিত";

  return (
    <main className="min-h-screen bg-[#f1f8f3] px-4 py-8 text-[#183d32] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href={`/category/${product.category}`}
          className="font-semibold text-green-800 hover:underline"
        >
          ← {product.categoryNameBn} বিভাগে ফিরে যাও
        </Link>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-[#e7f5eb] text-6xl">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-green-700">
                {product.categoryNameBn}
              </p>
              <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                {product.nameBn}
              </h1>
              <p className="mt-3 text-gray-500">
                একক: প্রতি {product.unit}
              </p>
              <p className={`mt-3 font-bold ${changeColor}`}>
                {changeText} · {formatPrice(product.change.pct)}%
              </p>
            </div>

            <div className="rounded-2xl bg-[#e7f5eb] p-5">
              <p className="text-sm text-gray-600">আজকের দাম</p>
              <p className="mt-2 text-3xl font-extrabold text-green-800">
                ৳{formatPrice(product.today)}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                প্রতি {product.unit}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-extrabold">দামের ইতিহাস</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {prices.map((price) => (
              <div
                key={price.label}
                className="rounded-2xl bg-white p-5 shadow-sm"
              >
                <p className="text-sm text-gray-500">{price.label}</p>
                <p className="mt-3 text-2xl font-extrabold">
                  ৳{formatPrice(price.value)}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  প্রতি {product.unit}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-extrabold">
            বিভিন্ন বাজারের দাম
          </h2>

          {product.markets.length > 0 ? (
            <div className="mt-4 overflow-x-auto rounded-2xl bg-white shadow-sm">
              <table className="w-full min-w-[500px] text-left">
                <thead className="bg-[#e7f5eb]">
                  <tr>
                    <th className="px-5 py-4">বাজার</th>
                    <th className="px-5 py-4">বিভাগ</th>
                    <th className="px-5 py-4">সর্বনিম্ন দাম</th>
                    <th className="px-5 py-4">সর্বোচ্চ দাম</th>
                  </tr>
                </thead>
                <tbody>
                  {product.markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${index}`}
                      className="border-t border-gray-100"
                    >
                      <td className="px-5 py-4 font-semibold">
                        {market.market}
                      </td>
                      <td className="px-5 py-4">{market.division}</td>
                      <td className="px-5 py-4 font-semibold text-green-700">
                        ৳{formatPrice(market.min)}
                      </td>
                      <td className="px-5 py-4 font-semibold text-red-600">
                        ৳{formatPrice(market.max)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 rounded-2xl bg-white p-6 text-gray-500">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>

        <button
          onClick={() => void loadProduct(true)}
          className="mt-8 rounded-xl border border-green-700 px-5 py-3 font-bold text-green-800 hover:bg-green-50"
        >
          দাম আবার দেখুন
        </button>
      </div>
    </main>
  );
}