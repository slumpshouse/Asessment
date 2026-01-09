import { beforeAll, beforeEach, afterEach } from 'vitest';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

let prisma;

beforeAll(async () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaNeon(pool);
  prisma = new PrismaClient({ adapter });

  await prisma.$executeRaw`DROP TABLE IF EXISTS published_images CASCADE`;
  await prisma.$executeRaw`CREATE TABLE published_images (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    prompt TEXT NOT NULL,
    hearts INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
  )`;
});

beforeEach(async () => {
  if (prisma) {
    await prisma.$executeRaw`TRUNCATE TABLE published_images RESTART IDENTITY CASCADE`;
  }
});

afterEach(async () => {
  if (prisma) {
    await prisma.$disconnect();
  }
});

export { prisma };
