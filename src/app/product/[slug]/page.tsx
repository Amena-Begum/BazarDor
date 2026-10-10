
import ProductDetailsClient from "./ProductDetailsClient";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  return <ProductDetailsClient slug={slug} />;
}