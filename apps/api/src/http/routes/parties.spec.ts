import { describe, expect, it } from 'vitest';

import { buildApp } from '../../app.js';

describe('GET /parties', () => {
  it('should return all parties', async () => {
    const app = buildApp();

    const response = await app.inject({
      method: 'GET',
      url: '/parties',
    });

    expect(response.statusCode).toBe(200);

    const body = response.json();

    expect(body).toBeInstanceOf(Array);
  });

  it('should return a party by id', async () => {
    const app = buildApp();

    const listResponse = await app.inject({
      method: 'GET',
      url: '/parties',
    });

    const parties = listResponse.json();

    const response = await app.inject({
      method: 'GET',
      url: `/parties/${parties[0].id}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().id).toBe(parties[0].id);
  });

  it('should return 404 when party does not exist', async () => {
    const app = buildApp();

    const response = await app.inject({
      method: 'GET',
      url: `/parties/${crypto.randomUUID()}`,
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({
      message: 'Party not found',
    });
  });

  it('should create a party', async () => {
    const app = buildApp();

    const response = await app.inject({
      method: 'POST',
      url: '/parties',
      payload: {
        name: 'Partido de Teste',
        acronym: 'PDT',
        number: 98,
      },
    });

    expect(response.statusCode).toBe(201);

    const body = response.json();

    expect(body.name).toBe('Partido de Teste');
    expect(body.acronym).toBe('PDT');
    expect(body.id).toBeDefined();
  });
});