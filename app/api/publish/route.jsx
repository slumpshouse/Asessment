import { prisma } from '../../../prisma.config';

export async function POST(request) {
	try {
		const body = await request.json();
		const { imageUrl, prompt } = body;

		const errors = [];
    
		if (!imageUrl) {
			errors.push('imageUrl is required');
		} else if (typeof imageUrl !== 'string' || imageUrl.trim() === '') {
			errors.push('imageUrl must be a non-empty string');
		}

		if (!prompt) {
			errors.push('prompt is required');
		} else if (typeof prompt !== 'string') {
			errors.push('prompt must be a string');
		}

		if (errors.length > 0) {
			return Response.json(
				{ error: 'Validation failed', details: errors },
				{ status: 400 }
			);
		}

		const publishedImage = await prisma.publishedImage.create({
			data: {
				imageUrl: imageUrl.trim(),
				prompt: prompt.trim(),
				hearts: 0,
			},
		});

		return Response.json(publishedImage, { status: 201 });

	} catch (error) {
		console.error('Error publishing image:', error);
		return Response.json(
			{ error: 'Failed to publish image. Please try again.' },
			{ status: 500 }
		);
	}
}

export async function GET() {
	return Response.json({ error: 'Method not allowed' }, { status: 405 });
}

