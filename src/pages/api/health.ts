import type { APIRoute } from 'astro';
import { logger } from '../../utils/logger';

export const GET: APIRoute = async () => {
  // Use our new structured JSON logger!
  logger.info('Health check endpoint was accessed', { endpoint: '/api/health' });

  return new Response(
    JSON.stringify({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};