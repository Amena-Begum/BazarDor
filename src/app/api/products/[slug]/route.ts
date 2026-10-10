
import { NextResponse } from "next/server";
import { getProduct } from "@/lib/api";

type RouteContext = {
    params: Promise<{ slug: string }>;
};

export async function GET(
    _request: Request,
    { params }: RouteContext
) {
    try {
        const { slug } = await params;
        const product = await getProduct(slug);

        if (!product) {
            return NextResponse.json(
                { message: "পণ্য পাওয়া যায়নি।" },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("Product API error:", error);

        return NextResponse.json(
            { message: "পণ্যের তথ্য লোড করা যায়নি।" },
            { status: 500 }
        );
    }
}