
import type { Product } from "../types/product";

const BASE_URL =
  "https://api.api-store.workers.dev/api/bazardor";

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
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
  const response = await fetch(`${BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

// Fetch products by category slug
export async function getCategoryProducts(
  category: string
): Promise<Product[]> {
  const response = await fetch(
    `${BASE_URL}/products?category=${encodeURIComponent(category)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }

  return response.json();
}