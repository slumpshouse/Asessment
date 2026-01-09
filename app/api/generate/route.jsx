import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { prompt } = body || {};

    // Validation
    if (prompt === undefined || prompt === null) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }
    if (typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt must be a string' }, { status: 400 });
    }
    if (!prompt.trim()) {
      return NextResponse.json({ error: 'Prompt must not be empty' }, { status: 400 });
    }

    // Call OpenAI - placeholder implementation
    // TODO: Replace with real OpenAI call using process.env.OPENAI_API_KEY
    // Example (server-side): fetch('https://api.openai.com/v1/images/generations', { ... })

    // Placeholder success
    return NextResponse.json({ imageUrl: 'https://example.com/generated-image.jpg', prompt }, { status: 200 });
  } catch (error) {
    console.error('Generate API error:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
