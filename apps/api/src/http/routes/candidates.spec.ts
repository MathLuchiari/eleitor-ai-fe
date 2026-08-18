import { describe, expect, it } from 'vitest';

import { buildApp } from '../../app.js';

describe('GET /candidates', () => {
  it('should return all candidates', async () => {
    const app = buildApp();

    const response = await app.inject({
      method: 'GET',
      url: '/candidates',
    });

    expect(response.statusCode).toBe(200);

    const body = response.json();

    expect(body).toBeInstanceOf(Array);
  });
});