import { describe, expect, it, vi } from 'vitest';

import { GovernmentPlan } from '../../../domain/entities/government-plan.js';
import type { GovernmentPlanRepository } from '../../../domain/repositories/government-plan-repository.js';

import { ListGovernmentPlansUseCase } from './list-government-plans.js';

describe('ListGovernmentPlansUseCase', () => {
  it('should return all government plans', async () => {
    const governmentPlans = [
      GovernmentPlan.create({
        candidateId: 'candidate-1',
        title: 'Government Plan 1',
      }),
      GovernmentPlan.create({
        candidateId: 'candidate-2',
        title: 'Government Plan 2',
      }),
    ];

    const governmentPlanRepository: GovernmentPlanRepository = {
      findById: vi.fn(),
      findByCandidateId: vi.fn(),
      findAll: vi.fn().mockResolvedValue(governmentPlans),
      create: vi.fn(),
    };

    const useCase = new ListGovernmentPlansUseCase(
      governmentPlanRepository,
    );

    const result = await useCase.execute();

    expect(result).toEqual(governmentPlans);
    expect(governmentPlanRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
