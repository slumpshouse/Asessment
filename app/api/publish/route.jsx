import { NextResponse } from 'next/server';
// import prisma from '@/prisma.config';

export async function POST(request) {
  try {
    const body = await request.json();
    const { imageUrl, prompt } = body || {};

    if (!imageUrl && !prompt) {
      return NextResponse.json({ error: 'imageUrl and prompt are required' }, { status: 400 });
    }
    if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.trim()) {
      return NextResponse.json({ error: 'imageUrl must be a non-empty string' }, { status: 400 });
    }
    if (prompt === undefined || prompt === null) {
      return NextResponse.json({ error: 'prompt is required (can be empty string)' }, { status: 400 });
    }

    // TODO: Create record in DB via prisma
    // const publishedImage = await prisma.publishedImage.create({ data: { imageUrl, prompt } });

    // Placeholder response
    return NextResponse.json({ id: 1, imageUrl, prompt, hearts: 0, createdAt: new Date().toISOString() }, { status: 201 });
  } catch (error) {
    console.error('Publish API error:', error);
    return NextResponse.json({ error: 'Failed to publish image' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
