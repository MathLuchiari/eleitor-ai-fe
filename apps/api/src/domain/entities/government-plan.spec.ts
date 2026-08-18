import { describe, expect, it } from 'vitest';
import { GovernmentPlan } from './government-plan.js';

describe('GovernmentPlan', () => {
  it('should create a government plan', () => {
    const plan = GovernmentPlan.create({
      candidateId: 'candidate-id',
      title: 'Plano de Governo 2026',
      description: 'Plano de governo do candidato',
    });

    expect(plan.id).toBeDefined();
    expect(plan.candidateId).toBe('candidate-id');
    expect(plan.title).toBe('Plano de Governo 2026');
    expect(plan.description).toBe('Plano de governo do candidato');
    expect(plan.createdAt).toBeInstanceOf(Date);
    expect(plan.updatedAt).toBeInstanceOf(Date);
  });
});