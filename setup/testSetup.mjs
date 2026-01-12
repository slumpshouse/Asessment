import { beforeEach, afterEach, beforeAll, afterAll } from 'vitest';

// If DATABASE_URL isn't provided, skip DB setup to allow tests that only
// inspect files to run in environments without a running database.
if (!process.env.DATABASE_URL) {
  console.warn('Skipping DB setup hooks: DATABASE_URL not set');
} else {
  const prismaMod = await import('../prisma.config.js');
  const prisma = prismaMod.prisma ?? prismaMod.default?.prisma;

  beforeAll(async () => {
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS published_images (
        id SERIAL PRIMARY KEY,
        image_url TEXT NOT NULL,
        prompt TEXT NOT NULL,
        hearts INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
  });

  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE published_images RESTART IDENTITY CASCADE`;
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
}
