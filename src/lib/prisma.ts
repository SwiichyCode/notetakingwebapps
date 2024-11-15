import { PrismaClient } from '@prisma/client';

declare global {
  var __database__: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!globalThis.__database__) {
    globalThis.__database__ = new PrismaClient();
  }
  prisma = globalThis.__database__;
}

export default prisma;
