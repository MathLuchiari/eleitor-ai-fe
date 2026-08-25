import { describe, expect, it } from 'vitest';

import { buildApp } from '../../app.js';

describe('GET /sources', () => {
  it('should return all sources', async () => {
    const app = buildApp();

    const response = await app.inject({
      method: 'GET',
      url: '/sources',
    });

    expect(response.statusCode).toBe(200);

    const body = response.json();

    expect(body).toBeInstanceOf(Array);
  });

  it('should return a source by id', async () => {
    const app = buildApp();

    const listResponse = await app.inject({
      method: 'GET',
      url: '/sources',
    });

    const sources = listResponse.json();

    const response = await app.inject({
      method: 'GET',
      url: `/sources/${sources[0].id}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().id).toBe(sources[0].id);
  });

  it('should return 404 when source does not exist', async () => {
    const app = buildApp();

    const response = await app.inject({
      method: 'GET',
      url: `/sources/${crypto.randomUUID()}`,
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({
      message: 'Source not found',
    });
  });

  it('should return sources by document', async () => {
    const app = buildApp();

    const listResponse = await app.inject({
      method: 'GET',
      url: '/sources',
    });

    const sources = listResponse.json();

    const response = await app.inject({
      method: 'GET',
      url: `/sources/document/${sources[0].documentId}`,
    });

    expect(response.statusCode).toBe(200);

    const body = response.json();

    expect(body).toBeInstanceOf(Array);
    expect(body.every((source: { documentId: string }) =>
      source.documentId === sources[0].documentId,
    )).toBe(true);
  });

  it('should create a source', async () => {
    const app = buildApp();

    const listResponse = await app.inject({
      method: 'GET',
      url: '/sources',
    });

    const sources = listResponse.json();

    const response = await app.inject({
      method: 'POST',
      url: '/sources',
      payload: {
        documentId: sources[0].documentId,
        title: 'Nova Fonte Oficial',
        url: 'https://example.com/nova-fonte',
        publisher: 'EleitorAI',
        type: 'GOVERNMENT',
      },
    });

    expect(response.statusCode).toBe(201);

    const body = response.json();

    expect(body.title).toBe('Nova Fonte Oficial');
    expect(body.documentId).toBe(sources[0].documentId);
    expect(body.url).toBe('https://example.com/nova-fonte');
    expect(body.publisher).toBe('EleitorAI');
    expect(body.type).toBe('GOVERNMENT');
    expect(body.id).toBeDefined();
  });
});
