import { prisma } from '../../../prisma.config';

export async function POST(request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return Response.json({ error: 'Prompt is required' }, { status: 400 });
    }

    if (typeof prompt !== 'string' || prompt.trim() === '') {
      return Response.json({ error: 'Prompt must be a non-empty string' }, { status: 400 });
    }

    // Lazy-load OpenAI after validating input to avoid initialization errors
    // causing unrelated requests (like missing prompt) to return 500.
    let OpenAI, openai;
    try {
      OpenAI = (await import('openai')).default;
      openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    } catch (initErr) {
      console.error('OpenAI initialization failed:', initErr);
      return Response.json({ error: 'OpenAI client initialization failed' }, { status: 500 });
    }

    // Use the modern OpenAI image model and support b64 responses
    const response = await openai.images.generate({
      model: 'gpt-image-1',
      prompt: prompt.trim(),
      size: '512x512',
    });

    const item = response?.data?.[0] ?? null;
    let imageUrl = null;

    if (item) {
      if (item.url) imageUrl = item.url;
      else if (item.b64_json) imageUrl = `data:image/png;base64,${item.b64_json}`;
    }

    if (!imageUrl) {
      console.error('OpenAI response missing image data:', response);
      return Response.json({ error: 'OpenAI did not return an image' }, { status: 502 });
    }

    return Response.json({ imageUrl, prompt: prompt.trim() }, { status: 200 });

  } catch (error) {
    console.error('Error generating image:', error);
    const status = error?.response?.status || 500;
    const detail = error?.response?.data || error?.message || String(error);

    if (status === 401) {
      return Response.json({ error: 'Invalid OpenAI API key', detail }, { status: 401 });
    }
    if (status === 429) {
      return Response.json({ error: 'Rate limit exceeded. Please try again later.', detail }, { status: 429 });
    }

    return Response.json({ error: 'Failed to generate image. Please try again.', detail }, { status });
  }
}

export async function GET() {
  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}
