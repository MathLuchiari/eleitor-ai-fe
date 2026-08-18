import { describe, expect, it, vi } from 'vitest';

import { Candidate } from '../../../domain/entities/candidate.js';
import type { CandidateRepository } from '../../../domain/repositories/candidate-repository.js';

import { ListCandidatesUseCase } from './list-candidates.js';

describe('ListCandidatesUseCase', () => {
  it('should return all candidates', async () => {
    const candidates = [
      Candidate.create({
        name: 'Candidate 1',
        partyId: 'party-1',
        status: 'ACTIVE',
      }),
      Candidate.create({
        name: 'Candidate 2',
        partyId: 'party-2',
        status: 'ACTIVE',
      }),
    ];

    const candidateRepository: CandidateRepository = {
      findById: vi.fn(),
      findByPartyId: vi.fn(),
      findAll: vi.fn().mockResolvedValue(candidates),
      create: vi.fn(),
    };

    const useCase = new ListCandidatesUseCase(candidateRepository);

    const result = await useCase.execute();

    expect(result).toEqual(candidates);
    expect(candidateRepository.findAll).toHaveBeenCalledTimes(1);
  });
});