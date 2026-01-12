// Minimal prisma.config.js shim for Prisma v7 where connection is provided at runtime.
// This file intentionally exports configuration helpers if needed by tools.

const { PrismaClient } = require('@prisma/client');
const { prisma } = require('./prisma.neon.config');

module.exports = {
  prismaClient: PrismaClient,
  prisma,
};
