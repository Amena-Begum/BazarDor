"use client";

import { useMemo, useState } from "react";
import type { Product } from "../types/product";

export default function ProductSection({
title,
icon,
products,
color,
}: {
title: string;
icon: string;
products: Product[];
color: string;
}) {
const [sortOrder, setSortOrder] = useState("high-low");

const sortedProducts = useMemo(() => {
return [...products].sort((a, b) => {
return sortOrder === "high-low"
? b.today - a.today
: a.today - b.today;
});
}, [products, sortOrder]);

return (
     <section className="mt-8"> <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"> <h2 className="flex items-center gap-2 text-xl font-extrabold text-[#183d32]"> <span className={color}>{icon}</span>
{title} </h2>
    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      aria-label={`${title} পণ্যের দাম সাজান`}
      className="select select-bordered w-full border-[#dce9df] bg-white text-sm text-[#183d32] sm:w-48"
    >
      <option value="high-low">দাম: বড় থেকে ছোট</option>
      <option value="low-high">দাম: ছোট থেকে বড়</option>
    </select>
  </div>

  {sortedProducts.length === 0 ? (
    <p className="rounded-xl bg-white p-5 text-sm text-gray-500">
      আপাতত কোনো তথ্য পাওয়া যায়নি।
    </p>
  ) : (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {sortedProducts.map((product) => (
        <div key={product.id}>
          <ProductCardPlaceholder product={product} />
        </div>
      ))}
    </div>
  )}
</section>
);
}

function ProductCardPlaceholder({ product }: { product: Product }) {

return (
<a
href={`/product/${product.slug}`}
className="group flex min-w-0 items-center gap-3 rounded-2xl border border-[#e5f0e8] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:gap-4 sm:p-5"
> <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f0f7f1] text-3xl sm:size-14">
{product.image || product.categoryIcon || "🛒"} </div>

  <div className="min-w-0 flex-1">
    <h3 className="truncate font-bold text-[#183d32]">
      {product.nameBn}
    </h3>

    <p className="mt-1 text-sm text-gray-500">
      {getUnit(product.unit)}
    </p>

    <p className="mt-3 text-xs text-gray-500">আজকের দাম</p>

    <p className="text-lg font-extrabold text-[#164e3a]">
      {bn(product.today)} টাকা
    </p>
  </div>

  <span
    className={`self-end whitespace-nowrap rounded-full px-2 py-1 text-xs font-bold ${
      product.change.dir === "up"
        ? "bg-red-50 text-red-500"
        : product.change.dir === "down"
          ? "bg-green-50 text-green-600"
          : "bg-gray-100 text-gray-500"
    }`}
  >
    {product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "—"}{" "}
    {bn(product.change.pct)}%
  </span>
</a>

);
}

const bn = (value: number) =>
new Intl.NumberFormat("bn-BD", {
maximumFractionDigits: 1,
}).format(value);

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
