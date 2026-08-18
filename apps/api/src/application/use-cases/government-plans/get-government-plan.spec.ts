import { describe, expect, it, vi } from 'vitest';

import { GovernmentPlan } from '../../../domain/entities/government-plan.js';
import type { GovernmentPlanRepository } from '../../../domain/repositories/government-plan-repository.js';

import { GetGovernmentPlanUseCase } from './get-government-plan.js';

describe('GetGovernmentPlanUseCase', () => {
  it('should return a government plan by id', async () => {
    const governmentPlan = GovernmentPlan.create({
      candidateId: 'candidate-1',
      title: 'Government Plan 1',
    });

    const governmentPlanRepository: GovernmentPlanRepository = {
      findById: vi.fn().mockResolvedValue(governmentPlan),
      findByCandidateId: vi.fn(),
      findAll: vi.fn(),
      create: vi.fn(),
    };

    const useCase = new GetGovernmentPlanUseCase(
      governmentPlanRepository,
    );

    const result = await useCase.execute(governmentPlan.id);

    expect(result).toEqual(governmentPlan);
    expect(governmentPlanRepository.findById).toHaveBeenCalledWith(
      governmentPlan.id,
    );
    expect(governmentPlanRepository.findById).toHaveBeenCalledTimes(1);
  });
});
