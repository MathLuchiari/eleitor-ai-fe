import { describe, expect, it } from 'vitest';

import { Party } from '../../domain/entities/party.js';
import { DrizzlePartyRepository } from '../../infra/database/repositories/drizzle-party-repository.js';

describe('DrizzlePartyRepository', () => {
  const repository = new DrizzlePartyRepository();

  it('should persist and retrieve a party', async () => {
    const party = Party.create({
      name: 'Partido Teste',
      acronym: `PT${Date.now()}`,
      number: Math.floor(Math.random() * 100000),
    });

    await repository.create(party);

    const result = await repository.findById(party.id);

    expect(result).not.toBeNull();
    expect(result?.id).toBe(party.id);
    expect(result?.name).toBe(party.name);
    expect(result?.acronym).toBe(party.acronym);
    expect(result?.number).toBe(party.number);
  });
});