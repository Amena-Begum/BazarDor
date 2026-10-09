
import type { Product } from "../types/product";

const BASE_URL =
  "https://api.api-store.workers.dev/api/bazardor";

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`, {
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

// Find one product by its slug
export async function getProduct(
  slug: string
): Promise<Product | null> {
  const products = await getProducts();

  return products.find((product) => product.slug === slug) ?? null;
}

// Fetch categories
export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("ক্যাটাগরির তথ্য লোড করা যায়নি।");
  }

  return response.json();
}

// Fetch products by category slug
export async function getCategoryProducts(
  category: string
): Promise<Product[]> {
  const response = await fetch(
    `${BASE_URL}/products?category=${encodeURIComponent(category)}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("ক্যাটাগরির পণ্য লোড করা যায়নি।");
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("API থেকে সঠিক পণ্যের তথ্য পাওয়া যায়নি।");
  }

  return data as Product[];
}