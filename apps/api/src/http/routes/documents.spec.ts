import { describe, expect, it } from 'vitest';

import { buildApp } from '../../app.js';

describe('GET /documents', () => {
  it('should return all documents', async () => {
    const app = buildApp();

    const response = await app.inject({
      method: 'GET',
      url: '/documents',
    });

    expect(response.statusCode).toBe(200);

    const body = response.json();

    expect(body).toBeInstanceOf(Array);
  });
});
