import { describe, expect, it } from 'vitest';
import { Document } from './document.js';

describe('Document', () => {
  it('should create a document', () => {
    const document = Document.create({
      governmentPlanId: 'government-plan-id',
      title: 'Plano de Governo',
      type: 'GOVERNMENT_PLAN',
      content: 'Conteúdo do plano de governo.',
    });

    expect(document.id).toBeDefined();
    expect(document.governmentPlanId).toBe('government-plan-id');
    expect(document.title).toBe('Plano de Governo');
    expect(document.type).toBe('GOVERNMENT_PLAN');
    expect(document.content).toBe('Conteúdo do plano de governo.');
    expect(document.createdAt).toBeInstanceOf(Date);
    expect(document.updatedAt).toBeInstanceOf(Date);
  });
});