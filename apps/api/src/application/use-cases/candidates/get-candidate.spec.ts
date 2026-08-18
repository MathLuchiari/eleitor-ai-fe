import { describe, expect, it, vi } from 'vitest';

import { Candidate } from '../../../domain/entities/candidate.js';
import type { CandidateRepository } from '../../../domain/repositories/candidate-repository.js';

import { GetCandidateUseCase } from './get-candidate.js';

describe('GetCandidateUseCase', () => {
  it('should return a candidate by id', async () => {
    const candidate = Candidate.create({
      name: 'Candidate 1',
      partyId: 'party-1',
      status: 'ACTIVE',
    });

    const candidateRepository: CandidateRepository = {
      findById: vi.fn().mockResolvedValue(candidate),
      findByPartyId: vi.fn(),
      findAll: vi.fn(),
      create: vi.fn(),
    };

    const useCase = new GetCandidateUseCase(candidateRepository);

    const result = await useCase.execute(candidate.id);

    expect(result).toEqual(candidate);
    expect(candidateRepository.findById).toHaveBeenCalledWith(candidate.id);
    expect(candidateRepository.findById).toHaveBeenCalledTimes(1);
  });
});
