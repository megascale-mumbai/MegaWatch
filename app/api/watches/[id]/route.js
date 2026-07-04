import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    // In our new schema, id is a UUID string. 
    // If it's passed as a fallback to the 'name' field, we can query by name or id.
    const watch = await prisma.watch.findFirst({
      where: {
        OR: [
          { id: id },
          { name: id }
        ]
      }
    });

    if (!watch) {
      return NextResponse.json({ success: true, data: null });
    }
    return NextResponse.json({ success: true, data: watch });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const { name, description, category, dialImage, dialScale, _id, id: bodyId, createdAt, updatedAt, ...configData } = body;

    // Use findFirst to get the actual UUID if they queried by name
    const existingWatch = await prisma.watch.findFirst({
      where: {
        OR: [
          { id: id },
          { name: id }
        ]
      }
    });

    if (!existingWatch) {
      return NextResponse.json({ success: false, error: 'Watch not found' }, { status: 404 });
    }

    const updatedWatch = await prisma.watch.update({
      where: { id: existingWatch.id },
      data: {
        name: name !== undefined ? name : existingWatch.name,
        description: description !== undefined ? description : existingWatch.description,
        category: category !== undefined ? category : existingWatch.category,
        dialImage: dialImage !== undefined ? dialImage : existingWatch.dialImage,
        dialScale: dialScale !== undefined ? dialScale : existingWatch.dialScale,
        config: configData,
      }
    });

    return NextResponse.json({ success: true, data: updatedWatch });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    const existingWatch = await prisma.watch.findFirst({
      where: {
        OR: [
          { id: id },
          { name: id }
        ]
      }
    });

    if (!existingWatch) {
      return NextResponse.json({ success: false, error: 'Watch not found' }, { status: 404 });
    }

    await prisma.watch.delete({
      where: { id: existingWatch.id }
    });
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
