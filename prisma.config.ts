import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import WebSocket from 'ws';

// Configure WebSocket for Node.js (required for serverless Neon)
neonConfig.webSocketConstructor = WebSocket as any;

const connectionString = process.env.DATABASE_URL as string;
const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);

// Export a configured PrismaClient instance for application code
export const prisma = new PrismaClient({ adapter } as any);

// Also export the pool and adapter for tooling if needed
export { pool, adapter };

export default {
  prisma,
  pool,
  adapter,
};
