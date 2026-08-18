import { describe, expect, it, vi } from 'vitest';

import { Party } from '../../../domain/entities/party.js';
import type { PartyRepository } from '../../../domain/repositories/party-repository.js';

import { GetPartyUseCase } from './get-party.js';

describe('GetPartyUseCase', () => {
  it('should return a party by id', async () => {
    const party = Party.create({
      name: 'Party 1',
      acronym: 'P1',
      number: 10,
    });

    const partyRepository: PartyRepository = {
      findById: vi.fn().mockResolvedValue(party),
      findByAcronym: vi.fn(),
      findByNumber: vi.fn(),
      findAll: vi.fn(),
      create: vi.fn(),
    };

    const useCase = new GetPartyUseCase(partyRepository);

    const result = await useCase.execute(party.id);

    expect(result).toEqual(party);
    expect(partyRepository.findById).toHaveBeenCalledWith(party.id);
    expect(partyRepository.findById).toHaveBeenCalledTimes(1);
  });
});
