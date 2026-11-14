import { PrismaClient } from '@prisma/client';
import { env } from './env';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const basePrisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = basePrisma;
}

/** Neon's pooled connection (what DATABASE_URL points at) drops idle connections when the
 *  database auto-suspends on free-tier plans — the first query after a few idle minutes can
 *  land on a connection that's already been closed server-side ("Server has closed the
 *  connection"). That's transient, not a real failure, so retry once rather than surfacing a
 *  500 for what the user experiences as "it randomly doesn't work". */
function isTransientConnectionError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  // "Can't reach database server" = Neon compute still waking from auto-suspend (cold start).
  return /server has closed the connection|can't reach database server|connection.*(closed|reset|terminated)|ECONNRESET/i.test(message);
}

export const prisma = basePrisma.$extends({
  query: {
    $allModels: {
      async $allOperations({ args, query }) {
        try {
          return await query(args);
        } catch (err) {
          if (!isTransientConnectionError(err)) throw err;
          return await query(args);
        }
      },
    },
  },
});
