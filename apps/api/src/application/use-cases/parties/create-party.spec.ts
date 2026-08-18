import { describe, expect, it, vi } from 'vitest';

import type { PartyRepository } from '../../../domain/repositories/party-repository.js';

import { CreatePartyUseCase } from './create-party.js';

describe('CreatePartyUseCase', () => {
  it('should create a party', async () => {
    const partyRepository: PartyRepository = {
      findById: vi.fn(),
      findByAcronym: vi.fn(),
      findByNumber: vi.fn(),
      findAll: vi.fn(),
      create: vi.fn().mockResolvedValue(undefined),
    };

    const useCase = new CreatePartyUseCase(partyRepository);

    const result = await useCase.execute({
      name: 'Party 1',
      acronym: 'P1',
      number: 10,
    });

    expect(result.name).toBe('Party 1');
    expect(result.acronym).toBe('P1');
    expect(result.number).toBe(10);
    expect(partyRepository.create).toHaveBeenCalledWith(result);
    expect(partyRepository.create).toHaveBeenCalledTimes(1);
  });
});
