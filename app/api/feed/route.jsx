import { NextResponse } from 'next/server';
// import prisma from '@/prisma.config';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let page = parseInt(searchParams.get('page') || '1');
    let limit = parseInt(searchParams.get('limit') || '10');

    if (isNaN(page) || page < 1) {
      return NextResponse.json({ error: 'Invalid page parameter' }, { status: 400 });
    }
    if (isNaN(limit) || limit < 1) {
      return NextResponse.json({ error: 'Invalid limit parameter' }, { status: 400 });
    }
    if (limit > 50) limit = 50;

    const skip = (page - 1) * limit;

    // TODO: Query database with prisma
    // const [images, total] = await Promise.all([
    //   prisma.publishedImage.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
    //   prisma.publishedImage.count()
    // ]);

    // Placeholder
    const images = [];
    const total = 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    return NextResponse.json({ images, total, page, totalPages }, { status: 200 });
  } catch (error) {
    console.error('Feed GET API error:', error);
    return NextResponse.json({ error: 'Failed to fetch feed' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, hearts } = body || {};

    if (id === undefined || id === null) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }
    if (hearts === undefined || hearts === null) {
      return NextResponse.json({ error: 'hearts is required' }, { status: 400 });
    }
    if (typeof id !== 'number' && isNaN(parseInt(id))) {
      return NextResponse.json({ error: 'id must be a number' }, { status: 400 });
    }
    if (typeof hearts !== 'number' && isNaN(parseInt(hearts))) {
      return NextResponse.json({ error: 'hearts must be a number' }, { status: 400 });
    }
    const parsedId = parseInt(id);
    const parsedHearts = parseInt(hearts);
    if (parsedHearts < 0) {
      return NextResponse.json({ error: 'hearts must be non-negative' }, { status: 400 });
    }

    // TODO: Check existence and update via prisma
    // const existing = await prisma.publishedImage.findUnique({ where: { id: parsedId } });
    // if (!existing) return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    // const updated = await prisma.publishedImage.update({ where: { id: parsedId }, data: { hearts: parsedHearts } });

    // Placeholder response
    return NextResponse.json({ id: parsedId, imageUrl: 'https://example.com/image.jpg', prompt: 'Example prompt', hearts: parsedHearts, createdAt: new Date().toISOString() }, { status: 200 });
  } catch (error) {
    console.error('Feed PUT API error:', error);
    return NextResponse.json({ error: 'Failed to update hearts' }, { status: 500 });
  }
}
