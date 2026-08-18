import { describe, expect, it, vi } from 'vitest';

import { Candidate } from '../../../domain/entities/candidate.js';
import type { CandidateRepository } from '../../../domain/repositories/candidate-repository.js';

import { ListCandidatesByPartyUseCase } from './list-candidates-by-party.js';

describe('ListCandidatesByPartyUseCase', () => {
  it('should return candidates by party id', async () => {
    const candidates = [
      Candidate.create({
        name: 'Candidate 1',
        partyId: 'party-1',
        status: 'ACTIVE',
      }),
      Candidate.create({
        name: 'Candidate 2',
        partyId: 'party-1',
        status: 'ACTIVE',
      }),
    ];

    const candidateRepository: CandidateRepository = {
      findById: vi.fn(),
      findByPartyId: vi.fn().mockResolvedValue(candidates),
      findAll: vi.fn(),
      create: vi.fn(),
    };

    const useCase = new ListCandidatesByPartyUseCase(candidateRepository);

    const result = await useCase.execute('party-1');

    expect(result).toEqual(candidates);
    expect(candidateRepository.findByPartyId).toHaveBeenCalledWith('party-1');
    expect(candidateRepository.findByPartyId).toHaveBeenCalledTimes(1);
  });
});
