import { prisma } from '../../../prisma.config';

export async function GET(request) {
	try {
		const url = new URL(request.url);
		const page = parseInt(url.searchParams.get('page')) || 1;
		const limit = parseInt(url.searchParams.get('limit')) || 10;

		if (page < 1) {
			return Response.json({ error: 'Page must be a positive integer' }, { status: 400 });
		}

		if (limit < 1 || limit > 50) {
			const maxLimit = Math.min(50, Math.max(1, limit));
			return Response.json({ error: `Limit must be between 1 and 50. Using ${maxLimit}` }, { status: 400 });
		}

		const safeLimit = Math.min(50, Math.max(1, limit));
		const skip = (page - 1) * safeLimit;

		const [images, total] = await Promise.all([
			prisma.publishedImage.findMany({
				skip,
				take: safeLimit,
				orderBy: { createdAt: 'desc' },
			}),
			prisma.publishedImage.count(),
		]);

		const totalPages = Math.ceil(total / safeLimit);

		return Response.json({ images, total, page, limit: safeLimit, totalPages }, { status: 200 });
	} catch (error) {
		console.error('Error fetching feed:', error);
		return Response.json({ error: 'Failed to fetch feed. Please try again.' }, { status: 500 });
	}
}

export async function PUT(request) {
	try {
		const body = await request.json();
		const { id, hearts } = body;

		const errors = [];
    
		if (!id && id !== 0) {
			errors.push('id is required');
		} else if (typeof id !== 'number' || !Number.isInteger(id) || id < 1) {
			errors.push('id must be a positive integer');
		}

		if (!hearts && hearts !== 0) {
			errors.push('hearts is required');
		} else if (typeof hearts !== 'number' || !Number.isInteger(hearts) || hearts < 0) {
			errors.push('hearts must be a non-negative integer');
		}

		if (errors.length > 0) {
			return Response.json({ error: 'Validation failed', details: errors }, { status: 400 });
		}

		const existingImage = await prisma.publishedImage.findUnique({ where: { id } });

		if (!existingImage) {
			return Response.json({ error: 'Image not found' }, { status: 404 });
		}

		const updatedImage = await prisma.publishedImage.update({ where: { id }, data: { hearts } });

		return Response.json(updatedImage, { status: 200 });

	} catch (error) {
		console.error('Error updating hearts:', error);
		if (error.code === 'P2025') {
			return Response.json({ error: 'Image not found' }, { status: 404 });
		}
		return Response.json({ error: 'Failed to update hearts. Please try again.' }, { status: 500 });
	}
}

export async function POST() {
	return Response.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
	return Response.json({ error: 'Method not allowed' }, { status: 405 });
}

