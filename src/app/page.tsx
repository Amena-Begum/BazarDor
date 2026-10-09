import Link from "next/link";
import Image from "next/image";
import { getProducts } from "../lib/api";
import type { Product } from "../types/product";
import ProductSection from "../components/ProductSection";

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

function ProductCard({ product }: { product: Product }) {
  const rising = product.change.dir === "up";
  const falling = product.change.dir === "down";

  return (
    <Link
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
        className={`self-end whitespace-nowrap rounded-full px-2 py-1 text-xs font-bold ${rising
            ? "bg-red-50 text-red-500"
            : falling
              ? "bg-green-50 text-green-600"
              : "bg-gray-100 text-gray-500"
          }`}
      >
        {rising ? "▲" : falling ? "▼" : "—"}{" "}
        {bn(product.change.pct)}%
      </span>
    </Link>

  );
}

export default async function Home() {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Unable to load products:", error);
  }

  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (<main className="min-h-screen bg-[#f1f8f3] text-[#183d32]">
    {/* Scrolling price ticker */}
    <div className="overflow-hidden border-y border-[#e3eee6] bg-white py-3">
      {products.length > 0 ? (<div className="price-ticker flex w-max items-center">
        {[...products, ...products].map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="mx-4 flex items-center gap-2 whitespace-nowrap border-r border-gray-200 pr-5 text-sm"
          > <span>{product.image || product.categoryIcon || "🛒"}</span>

            <span className="font-bold">{product.nameBn}</span>

            <span className="text-gray-600">
              {bn(product.today)} টাকা/{product.unit}
            </span>

            <span
              className={
                product.change.dir === "up"
                  ? "font-bold text-red-500"
                  : product.change.dir === "down"
                    ? "font-bold text-green-600"
                    : "text-gray-500"
              }
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {bn(product.change.pct)}%
            </span>
          </div>
        ))}
      </div>
      ) : (
        <p className="px-5 text-sm text-gray-500">
          বাজারদরের তথ্য লোড করা যাচ্ছে না।
        </p>
      )}
    </div>

    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Hero banner */}
      <section className="flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl bg-gradient-to-r from-[#e2f4e8] to-[#f7fbf7] px-6 py-8 sm:px-10 md:min-h-[270px] md:flex-row">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-[#ccebd7] px-3 py-2 text-xs font-bold text-green-800 sm:text-sm">
            বাংলাদেশের নিত্যপণ্যের বাজারদর
          </span>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও অন্যান্য
            নিত্যপণ্যের দাম — সারা দেশের বিভিন্ন বাজারের সর্বশেষ
            তথ্য জানুন।
          </p>

          <a
            href="#সব-পণ্য"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-green-600 bg-white px-5 py-3 font-bold text-green-700 transition hover:bg-green-600 hover:text-white"
          >
            সব পণ্য দেখুন <span>→</span>
          </a>
        </div>

        <div className="flex w-full items-center justify-center md:w-5/12">
          <Image
            src="/images/bazar-hero.png"
            alt="বাজারের তাজা নিত্যপ্রয়োজনীয় পণ্য"
            width={500}
            height={400}
            priority
            className="h-auto max-h-[320px] w-full max-w-[420px] object-contain"
          />
        </div>
      </section>

      {/* Prices increased */}

      <ProductSection
        title="আজ দাম বেড়েছে"
        icon="▲"
        products={risers}
        color="text-red-500"
      />

      {/* Prices decreased */}
       <ProductSection
        title="আজ দাম কমেছে"
        icon="▼"
        products={fallers}
        color="text-green-600"
      />
      {/* All products */}
      <section id="সব-পণ্য" className="mt-10 scroll-mt-32">
        <h2 className="text-2xl font-extrabold">সব পণ্য</h2>

        <p className="mb-5 mt-2 text-sm text-gray-600">
          নিত্যপ্রয়োজনীয় সব পণ্যের আজকের বাজারদর এক জায়গায়।
        </p>

        {products.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center">
            <p className="font-bold">পণ্যের তথ্য পাওয়া যাচ্ছে না</p>

            <p className="mt-2 text-sm text-gray-500">
              কিছুক্ষণ পর আবার চেষ্টা করো।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  </main>
  );
}
