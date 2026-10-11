import Link from "next/link";
import { getProducts } from "@/lib/api";
import type { Product } from "@/types/product";

const bn = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value);

const unitNames: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
};

// Scrolling price strip shown under the navbar on every page
export default async function PriceTicker() {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Unable to load ticker products:", error);
  }

  return (
    <div className="overflow-hidden border-y border-[#e3eee6] bg-white py-3 text-[#183d32]">
      {products.length > 0 ? (
        <div className="price-ticker flex w-max items-center">
          {[...products, ...products].map((product, index) => (
            <Link
              key={`${product.id}-${index}`}
              href={`/product/${encodeURIComponent(product.slug)}`}
              className="mx-4 flex items-center gap-2 whitespace-nowrap border-r border-gray-200 pr-5 text-sm transition-colors hover:bg-green-50"
              aria-label={`${product.nameBn} পণ্যের বিস্তারিত দেখুন`}
            >
              <span>
                {product.image || product.categoryIcon || "🛒"}
              </span>

              <span className="font-bold text-green-900">
                {product.nameBn}
              </span>

              <span className="text-gray-600">
                {bn(product.today)} টাকা/{unitNames[product.unit.toLowerCase()] ?? product.unit}
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
                {bn(Math.abs(product.change.pct))}%
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="px-5 text-sm text-gray-500">
          বাজারদরের তথ্য লোড করা যাচ্ছে না।
        </p>
      )}
    </div>
  );
}
