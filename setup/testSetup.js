const { beforeEach, afterEach, beforeAll, afterAll } = require('vitest');
const { prisma } = require('../prisma.config');

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
