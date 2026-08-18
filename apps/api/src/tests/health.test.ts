import { describe, expect, it } from 'vitest';

process.env.DATABASE_URL ??= 'postgresql://test:test@localhost:5432/eleitorai_test';

describe('GET /health', () => {
  it('should return API health status', async () => {
    const { buildApp } = await import('../app.js');
    const app = buildApp();

    try {
      const response = await app.inject({
        method: 'GET',
        url: '/health',
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual({
        status: 'ok',
        environment: 'test',
      });
    } finally {
      await app.close();
    }
  }, 10000);
});
