import { describe, it, expect, beforeEach } from 'vitest';
import { prisma } from '../prisma.config';

describe('POST /api/publish', () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE published_images RESTART IDENTITY CASCADE`;
  });

  it('should publish an image with valid data', async () => {
    const imageData = { imageUrl: 'https://example.com/image.jpg', prompt: 'A beautiful sunset' };

    const response = await fetch('http://localhost:3000/api/publish', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(imageData) });

    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data).toHaveProperty('id');
    expect(data.imageUrl).toBe(imageData.imageUrl);
    expect(data.prompt).toBe(imageData.prompt);
    expect(data.hearts).toBe(0);
    expect(data).toHaveProperty('createdAt');
  });

  it('should return 400 when imageUrl is missing', async () => {
    const response = await fetch('http://localhost:3000/api/publish', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: 'A beautiful sunset' }) });
    expect(response.status).toBe(400);
  });

  it('should return 400 when prompt is missing', async () => {
    const response = await fetch('http://localhost:3000/api/publish', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageUrl: 'https://example.com/image.jpg' }) });
    expect(response.status).toBe(400);
  });
});
