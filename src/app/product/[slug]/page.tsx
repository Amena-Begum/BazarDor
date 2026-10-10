
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import ProductDetailsClient from "./ProductDetailsClient";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}`);
  }

  return <ProductDetailsClient slug={slug} />;
}
