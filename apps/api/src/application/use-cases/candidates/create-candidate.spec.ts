import { describe, expect, it, vi } from 'vitest';

import type { CandidateRepository } from '../../../domain/repositories/candidate-repository.js';

import { CreateCandidateUseCase } from './create-candidate.js';

describe('CreateCandidateUseCase', () => {
  it('should create a candidate', async () => {
    const candidateRepository: CandidateRepository = {
      findById: vi.fn(),
      findByPartyId: vi.fn(),
      findAll: vi.fn(),
      create: vi.fn().mockResolvedValue(undefined),
    };

    const useCase = new CreateCandidateUseCase(candidateRepository);

    const result = await useCase.execute({
      name: 'Candidate 1',
      partyId: 'party-1',
      status: 'ACTIVE',
    });

    expect(result.name).toBe('Candidate 1');
    expect(result.partyId).toBe('party-1');
    expect(result.status).toBe('ACTIVE');
    expect(candidateRepository.create).toHaveBeenCalledWith(result);
    expect(candidateRepository.create).toHaveBeenCalledTimes(1);
  });
});
