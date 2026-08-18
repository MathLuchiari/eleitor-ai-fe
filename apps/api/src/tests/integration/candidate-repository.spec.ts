import { describe, expect, it } from 'vitest';

import { Candidate } from '../../domain/entities/candidate.js';
import { Party } from '../../domain/entities/party.js';
import { DrizzleCandidateRepository } from '../../infra/database/repositories/drizzle-candidate-repository.js';
import { DrizzlePartyRepository } from '../../infra/database/repositories/drizzle-party-repository.js';

describe('DrizzleCandidateRepository', () => {
  const partyRepository = new DrizzlePartyRepository();
  const repository = new DrizzleCandidateRepository();

  async function createParty(): Promise<Party> {
    const party = Party.create({
      name: 'Partido Teste',
      acronym: `PT${Date.now()}${Math.floor(Math.random() * 100000)}`,
      number: Number(
        `${Date.now().toString().slice(-6)}${Math.floor(
          Math.random() * 1000,
        )
          .toString()
          .padStart(3, '0')}`,
      ),
    });

    await partyRepository.create(party);

    return party;
  }

  it('should persist and retrieve a candidate', async () => {
    const party = await createParty();
    const candidate = Candidate.create({
      name: 'Candidato Teste',
      partyId: party.id,
      status: 'ACTIVE',
    });

    await repository.create(candidate);

    const result = await repository.findById(candidate.id);

    expect(result).not.toBeNull();
    expect(result?.id).toBe(candidate.id);
    expect(result?.name).toBe(candidate.name);
    expect(result?.partyId).toBe(candidate.partyId);
    expect(result?.status).toBe(candidate.status);
  });

  it('should find candidates by party id', async () => {
    const party = await createParty();
    const candidate = Candidate.create({
      name: 'Candidato por Partido',
      partyId: party.id,
      status: 'ACTIVE',
    });

    await repository.create(candidate);

    const result = await repository.findByPartyId(party.id);

    expect(result.some((item) => item.id === candidate.id)).toBe(true);
  });

  it('should list all candidates', async () => {
    const party = await createParty();
    const candidate = Candidate.create({
      name: 'Candidato Listado',
      partyId: party.id,
      status: 'INACTIVE',
    });

    await repository.create(candidate);

    const result = await repository.findAll();

    expect(result.some((item) => item.id === candidate.id)).toBe(true);
  });
});
