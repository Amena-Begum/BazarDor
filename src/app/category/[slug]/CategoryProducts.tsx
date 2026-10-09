"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "../../../types/product";

type SortOption = "default" | "low" | "high";

function bn(value: number) {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value);
}

function getUnit(unit: string) {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
  };

  return units[unit.toLowerCase()] ?? `প্রতি ${unit}`;
}

export default function CategoryProducts({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = [...products];

  if (sort === "low") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sort === "high") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <>
      {/* Sorting */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-600">
          মোট {bn(products.length)}টি পণ্য
        </p>

        <div className="flex items-center gap-2">
          <label
            htmlFor="product-sort"
            className="text-sm font-semibold"
          >
            সাজান:
          </label>

          <select
            id="product-sort"
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as SortOption)
            }
            className="rounded-xl border border-[#d8e7dc] bg-white px-3 py-2 text-sm outline-none focus:border-green-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => {
          const rising = product.change.dir === "up";
          const falling = product.change.dir === "down";

          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="flex min-w-0 items-center gap-3 rounded-2xl border border-[#e5f0e8] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f0f7f1] text-3xl sm:size-14">
                {product.image || product.categoryIcon || "🛒"}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="truncate font-bold text-[#183d32]">
                  {product.nameBn}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {getUnit(product.unit)}
                </p>

                <p className="mt-3 text-xs text-gray-500">
                  আজকের দাম
                </p>

                <p className="text-lg font-extrabold text-[#164e3a]">
                  {bn(product.today)} টাকা
                </p>
              </div>

              <span
                className={`self-end whitespace-nowrap rounded-full px-2 py-1 text-xs font-bold ${
                  rising
                    ? "bg-green-50 text-green-600"
                    : falling
                      ? "bg-red-50 text-red-500"
                      : "bg-gray-100 text-gray-500"
                }`}
              >
                {rising ? "▲" : falling ? "▼" : "—"}{" "}
                {bn(product.change.pct)}%
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}

