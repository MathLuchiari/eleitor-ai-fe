import { describe, expect, it } from 'vitest';

import { buildApp } from '../../app.js';

describe('GET /candidates', () => {
  it('should return a candidate by id', async () => {
    const app = buildApp();

    const listResponse = await app.inject({
      method: 'GET',
      url: '/candidates',
    });

    const candidates = listResponse.json();

    const response = await app.inject({
      method: 'GET',
      url: `/candidates/${candidates[0].id}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().id).toBe(candidates[0].id);
  }, 2000);

  it('should return 404 when candidate does not exist', async () => {
    const app = buildApp();

    const response = await app.inject({
      method: 'GET',
      url: `/candidates/${crypto.randomUUID()}`,
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({
      message: 'Candidate not found',
    });
  });

  it('should create a candidate', async () => {
    const app = buildApp();

    const listResponse = await app.inject({
      method: 'GET',
      url: '/candidates',
    });

    const candidates = listResponse.json();

    const response = await app.inject({
      method: 'POST',
      url: '/candidates',
      payload: {
        name: 'Novo Candidato',
        partyId: candidates[0].partyId,
        status: 'ACTIVE',
      },
    });

    expect(response.statusCode).toBe(201);

    const body = response.json();

    expect(body.name).toBe('Novo Candidato');
    expect(body.partyId).toBe(candidates[0].partyId);
    expect(body.status).toBe('ACTIVE');
    expect(body.id).toBeDefined();
  });

  it('should return candidates by party', async () => {
    const app = buildApp();

    const listResponse = await app.inject({
      method: 'GET',
      url: '/candidates',
    });

    const candidates = listResponse.json();

    const response = await app.inject({
      method: 'GET',
      url: `/candidates/party/${candidates[0].partyId}`,
    });

    expect(response.statusCode).toBe(200);

    const body = response.json();

    expect(body).toBeInstanceOf(Array);
    expect(body.every((candidate: { partyId: string }) =>
      candidate.partyId === candidates[0].partyId,
    )).toBe(true);
  });
});