const { Pool, neonConfig } = require('@neondatabase/serverless');
const { PrismaNeon } = require('@prisma/adapter-neon');
const { PrismaClient } = require('@prisma/client');
const WebSocket = require('ws');

// Configure WebSocket for Node.js
neonConfig.webSocketConstructor = WebSocket;

// Create a connection pool
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);

// Initialize Prisma Client with the adapter
const prisma = new PrismaClient({ adapter });

module.exports = {
  prisma,
  pool,
};
