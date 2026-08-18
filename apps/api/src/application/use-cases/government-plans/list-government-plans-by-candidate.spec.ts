import { describe, expect, it, vi } from 'vitest';

import { GovernmentPlan } from '../../../domain/entities/government-plan.js';
import type { GovernmentPlanRepository } from '../../../domain/repositories/government-plan-repository.js';

import { ListGovernmentPlansByCandidateUseCase } from './list-government-plans-by-candidate.js';

describe('ListGovernmentPlansByCandidateUseCase', () => {
  it('should return government plans by candidate id', async () => {
    const governmentPlans = [
      GovernmentPlan.create({
        candidateId: 'candidate-1',
        title: 'Government Plan 1',
      }),
      GovernmentPlan.create({
        candidateId: 'candidate-1',
        title: 'Government Plan 2',
      }),
    ];

    const governmentPlanRepository: GovernmentPlanRepository = {
      findById: vi.fn(),
      findByCandidateId: vi.fn().mockResolvedValue(governmentPlans),
      findAll: vi.fn(),
      create: vi.fn(),
    };

    const useCase = new ListGovernmentPlansByCandidateUseCase(
      governmentPlanRepository,
    );

    const result = await useCase.execute('candidate-1');

    expect(result).toEqual(governmentPlans);
    expect(
      governmentPlanRepository.findByCandidateId,
    ).toHaveBeenCalledWith('candidate-1');
    expect(
      governmentPlanRepository.findByCandidateId,
    ).toHaveBeenCalledTimes(1);
  });
});
