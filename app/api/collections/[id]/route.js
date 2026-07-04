import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const apiUrl = process.env.NEXT_PUBLIC_SHOP_API_URL || 'https://megaecomm.megascale.co.in/backend/api/shop';
    const token = process.env.SHOP_TOKEN || '';

    const response = await fetch(`${apiUrl}/collections/${id}`, {
      method: 'GET',
      headers: {
        'X-Shopfront-Token': token,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch collection details from shop API: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data: data.data || data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
