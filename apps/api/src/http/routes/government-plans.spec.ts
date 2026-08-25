import { describe, expect, it } from 'vitest';

import { buildApp } from '../../app.js';

describe('GET /government-plans', () => {
  it('should return all government plans', async () => {
    const app = buildApp();

    const response = await app.inject({
      method: 'GET',
      url: '/government-plans',
    });

    expect(response.statusCode).toBe(200);

    const body = response.json();

    expect(body).toBeInstanceOf(Array);
  });
  
  it('should return a government plan by id', async () => {
    const app = buildApp();

    const listResponse = await app.inject({
      method: 'GET',
      url: '/government-plans',
    });

    const plans = listResponse.json();

    const response = await app.inject({
      method: 'GET',
      url: `/government-plans/${plans[0].id}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().id).toBe(plans[0].id);
  });

  it('should return 404 when government plan does not exist', async () => {
    const app = buildApp();

    const response = await app.inject({
      method: 'GET',
      url: `/government-plans/${crypto.randomUUID()}`,
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({
      message: 'Government plan not found',
    });
  });

  it('should return government plans by candidate', async () => {
    const app = buildApp();

    const listResponse = await app.inject({
      method: 'GET',
      url: '/government-plans',
    });

    const plans = listResponse.json();

    const response = await app.inject({
      method: 'GET',
      url: `/government-plans/candidate/${plans[0].candidateId}`,
    });

    expect(response.statusCode).toBe(200);

    const body = response.json();

    expect(body).toBeInstanceOf(Array);
    expect(body.every((plan: { candidateId: string }) =>
      plan.candidateId === plans[0].candidateId,
    )).toBe(true);
  });

  it('should create a government plan', async () => {
    const app = buildApp();

    const listResponse = await app.inject({
      method: 'GET',
      url: '/government-plans',
    });

    const plans = listResponse.json();

    const response = await app.inject({
      method: 'POST',
      url: '/government-plans',
      payload: {
        candidateId: plans[0].candidateId,
        title: 'Novo Plano de Governo',
        description: 'Descrição do novo plano de governo.',
      },
    });

    expect(response.statusCode).toBe(201);

    const body = response.json();

    expect(body.title).toBe('Novo Plano de Governo');
    expect(body.candidateId).toBe(plans[0].candidateId);
    expect(body.description).toBe('Descrição do novo plano de governo.');
    expect(body.id).toBeDefined();
  });
});