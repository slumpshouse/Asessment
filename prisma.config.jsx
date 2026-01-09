// Prisma configuration for Neon adapter (JSX variant)
// This configures the database adapter for serverless PostgreSQL

import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

// Configure WebSocket for Node.js environment
neonConfig.webSocketConstructor = ws;

// Get database URL from environment variables
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create connection pool (not Client) for serverless PostgreSQL
const pool = new Pool({ connectionString });

// Create Prisma adapter with Neon
const adapter = new PrismaNeon(pool);

// Initialize Prisma Client with the adapter
const prisma = new PrismaClient({ adapter });

export default prisma;

// Usage in API routes:
// import prisma from '@/prisma.config';
// await prisma.publishedImage.create({...});
