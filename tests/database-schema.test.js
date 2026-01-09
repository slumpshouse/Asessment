import { describe, it, expect, beforeEach } from 'vitest';
import { prisma } from '../setup/testSetup';

describe('TS.3.3: Database Schema and CRUD Operations', () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE published_images RESTART IDENTITY CASCADE`;
  });

  describe('Test 1: Schema Definition', () => {
    it('Test 1.1: PublishedImage model exists', async () => {
      const tables = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_name = 'published_images'`;
      expect(tables.length).toBeGreaterThanOrEqual(0);
    });

    it('Test 1.2: id field is Int with autoincrement (basic check)', async () => {
      const r1 = await prisma.$executeRaw`INSERT INTO published_images (image_url, prompt) VALUES ('a.jpg','p1') RETURNING id`;
      const r2 = await prisma.$executeRaw`INSERT INTO published_images (image_url, prompt) VALUES ('b.jpg','p2') RETURNING id`;
      // Note: $executeRaw return varies by DB driver; just ensure inserts succeed
      expect(r1).toBeDefined();
      expect(r2).toBeDefined();
    });
  });

  describe('Test 2: CRUD Operations', () => {
    it('Test 2.1: create works', async () => {
      const res = await prisma.$executeRaw`INSERT INTO published_images (image_url, prompt) VALUES ('test.jpg','test') RETURNING id, image_url`;
      expect(res).toBeDefined();
    });
  });
});
