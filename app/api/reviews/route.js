import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { productId, name, rating, comment, title } = body;

        if (!productId || !name || !rating || !comment) {
            return NextResponse.json({ error: "Missing required fields: productId, name, rating, comment" }, { status: 400 });
        }

        const apiUrl = process.env.NEXT_PUBLIC_SHOP_API_URL || "https://megaecomm.megascale.co.in/backend/api/shop";
        const apiToken = process.env.SHOP_TOKEN || "";

        const response = await fetch(`${apiUrl}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopfront-Token": apiToken
            },
            body: JSON.stringify({
                product_id: productId,
                reviewer_name: name,
                rating: Number(rating),
                body: comment,
                title: title || ""
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Megaecomm review POST failed:", data);
            return NextResponse.json({ success: false, error: data?.message || "Failed to submit review" }, { status: response.status });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Review POST Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}