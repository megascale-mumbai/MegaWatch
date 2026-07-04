import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_SHOP_API_URL || 'https://megaecomm.megascale.co.in/backend/api/shop';
    const token = process.env.SHOP_TOKEN;

    const response = await fetch(`${apiUrl}/collections`, {
      method: 'GET',
      headers: {
        'X-Shopfront-Token': token,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch collections from shop API: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data: data.data || data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
