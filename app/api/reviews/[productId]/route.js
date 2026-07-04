import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { productId } = await params;

    if (!productId) {
        return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    try {
        const apiUrl = process.env.NEXT_PUBLIC_SHOP_API_URL || "https://megaecomm.megascale.co.in/backend/api/shop";
        const apiToken = process.env.SHOP_TOKEN;

        const response = await fetch(`${apiUrl}/reviews/product/${productId}?limit=10000`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Shopfront-Token": apiToken
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch reviews: ${response.statusText}`);
        }

        const data = await response.json();
        
        return NextResponse.json(data);
    } catch (error) {
        console.error("External Review API Error:", error);
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}