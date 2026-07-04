import { NextResponse } from 'next/server';
import { products as mockProducts } from '@/data/products';

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_SHOP_API_URL || 'https://megaecomm.megascale.co.in/backend/api/shop';
    const token = process.env.SHOP_TOKEN;
    
    const response = await fetch(`${apiUrl}/products`, {
      method: 'GET',
      headers: {
        'X-Shopfront-Token': token,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // cache 60 seconds — avoid hitting ecom on every request
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from shop platform API: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data: data.data || data });
  } catch (error) {
    console.warn("Shop API products fetch failed, using local fallback:", error.message);
    return NextResponse.json({ success: true, data: mockProducts });
  }
}
