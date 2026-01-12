import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Prisma schema and migration', () => {
  it('should have a Prisma schema file', () => {
    const schemaPath = path.resolve(process.cwd(), 'prisma', 'schema.prisma');
    expect(fs.existsSync(schemaPath)).toBe(true);
  });

  it('should have an initial migration SQL file', () => {
    const migPath = path.resolve(process.cwd(), 'prisma', 'migrations', '20250101000000_init', 'migration.sql');
    expect(fs.existsSync(migPath)).toBe(true);
  });
});
