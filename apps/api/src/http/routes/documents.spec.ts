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

  it('should return a document by id', async () => {
    const app = buildApp();

    const listResponse = await app.inject({
      method: 'GET',
      url: '/documents',
    });

    const documents = listResponse.json();

    const response = await app.inject({
      method: 'GET',
      url: `/documents/${documents[0].id}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().id).toBe(documents[0].id);
  });

  it('should return 404 when document does not exist', async () => {
    const app = buildApp();

    const response = await app.inject({
      method: 'GET',
      url: `/documents/${crypto.randomUUID()}`,
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({
      message: 'Document not found',
    });
  });

  it('should return documents by government plan', async () => {
    const app = buildApp();

    const listResponse = await app.inject({
      method: 'GET',
      url: '/documents',
    });

    const documents = listResponse.json();

    const response = await app.inject({
      method: 'GET',
      url: `/documents/government-plan/${documents[0].governmentPlanId}`,
    });

    expect(response.statusCode).toBe(200);

    const body = response.json();

    expect(body).toBeInstanceOf(Array);
    expect(body.every((document: { governmentPlanId: string }) =>
      document.governmentPlanId === documents[0].governmentPlanId,
    )).toBe(true);
  });

  it('should create a document', async () => {
    const app = buildApp();

    const listResponse = await app.inject({
      method: 'GET',
      url: '/documents',
    });

    const documents = listResponse.json();

    const response = await app.inject({
      method: 'POST',
      url: '/documents',
      payload: {
        governmentPlanId: documents[0].governmentPlanId,
        title: 'Novo Documento',
        type: 'OFFICIAL_DOCUMENT',
        content: 'Conteúdo do novo documento.',
      },
    });

    expect(response.statusCode).toBe(201);

    const body = response.json();

    expect(body.title).toBe('Novo Documento');
    expect(body.governmentPlanId).toBe(documents[0].governmentPlanId);
    expect(body.type).toBe('OFFICIAL_DOCUMENT');
    expect(body.content).toBe('Conteúdo do novo documento.');
    expect(body.id).toBeDefined();
  });
});
