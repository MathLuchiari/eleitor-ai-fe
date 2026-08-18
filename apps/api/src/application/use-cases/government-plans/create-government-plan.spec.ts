import { describe, expect, it, vi } from 'vitest';

import type { GovernmentPlanRepository } from '../../../domain/repositories/government-plan-repository.js';

import { CreateGovernmentPlanUseCase } from './create-government-plan.js';

describe('CreateGovernmentPlanUseCase', () => {
  it('should create a government plan', async () => {
    const publishedAt = new Date('2026-08-01T00:00:00.000Z');

    const governmentPlanRepository: GovernmentPlanRepository = {
      findById: vi.fn(),
      findByCandidateId: vi.fn(),
      findAll: vi.fn(),
      create: vi.fn().mockResolvedValue(undefined),
    };

    const useCase = new CreateGovernmentPlanUseCase(
      governmentPlanRepository,
    );

    const result = await useCase.execute({
      candidateId: 'candidate-1',
      title: 'Government Plan 1',
      description: 'Government plan description',
      publishedAt,
    });

    expect(result.candidateId).toBe('candidate-1');
    expect(result.title).toBe('Government Plan 1');
    expect(result.description).toBe('Government plan description');
    expect(result.publishedAt).toBe(publishedAt);
    expect(governmentPlanRepository.create).toHaveBeenCalledWith(result);
    expect(governmentPlanRepository.create).toHaveBeenCalledTimes(1);
  });
});
