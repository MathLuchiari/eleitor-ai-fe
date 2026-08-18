import { describe, expect, it, vi } from 'vitest';

import { Party } from '../../../domain/entities/party.js';
import type { PartyRepository } from '../../../domain/repositories/party-repository.js';

import { ListPartiesUseCase } from './list-parties.js';

describe('ListPartiesUseCase', () => {
  it('should return all parties', async () => {
    const parties = [
      Party.create({
        name: 'Party 1',
        acronym: 'P1',
        number: 10,
      }),
      Party.create({
        name: 'Party 2',
        acronym: 'P2',
        number: 20,
      }),
    ];

    const partyRepository: PartyRepository = {
      findById: vi.fn(),
      findByAcronym: vi.fn(),
      findByNumber: vi.fn(),
      findAll: vi.fn().mockResolvedValue(parties),
      create: vi.fn(),
    };

    const useCase = new ListPartiesUseCase(partyRepository);

    const result = await useCase.execute();

    expect(result).toEqual(parties);
    expect(partyRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
