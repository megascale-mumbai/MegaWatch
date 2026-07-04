import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const full = searchParams.get('full') === '1';

    // By default — return only lightweight fields (NO config/base64 blobs).
    // Pass ?full=1 from the editor to get the complete config.
    const watches = await prisma.watch.findMany({
      orderBy: { updatedAt: 'desc' },
      select: full
        ? undefined  // all fields
        : {
            id: true,
            name: true,
            dialImage: true,
            dialScale: true,
            updatedAt: true,
          },
    });
    return NextResponse.json({ success: true, data: watches });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Ensure name is present, fallback to ID or "Untitled"
    if (!body.name) body.name = body.id || `Watch ${Date.now()}`;
    
    // Extract relational fields and put the rest in config
    const { name, description, category, dialImage, dialScale, _id, id, createdAt, updatedAt, ...configData } = body;

    let watch = await prisma.watch.findFirst({ where: { name } });
    if (watch) {
      watch = await prisma.watch.update({
        where: { id: watch.id },
        data: {
          description: description || null,
          category: category || null,
          dialImage: dialImage || null,
          dialScale: dialScale || 100,
          config: configData,
        }
      });
    } else {
      watch = await prisma.watch.create({
        data: {
          name,
          description: description || null,
          category: category || null,
          dialImage: dialImage || null,
          dialScale: dialScale || 100,
          config: configData,
        }
      });
    }

    return NextResponse.json({ success: true, data: watch }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
