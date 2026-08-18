import { describe, expect, it } from 'vitest';

import { Candidate } from '../../src/domain/entities/candidate';
import { GovernmentPlan } from '../../src/domain/entities/government-plan';
import { Party } from '../../src/domain/entities/party';
import { DrizzleCandidateRepository } from '../../src/infra/database/repositories/drizzle-candidate-repository';
import { DrizzleGovernmentPlanRepository } from '../../src/infra/database/repositories/drizzle-government-plan-repository';
import { DrizzlePartyRepository } from '../../src/infra/database/repositories/drizzle-party-repository';

describe('DrizzleGovernmentPlanRepository', () => {
  const partyRepository = new DrizzlePartyRepository();
  const candidateRepository = new DrizzleCandidateRepository();
  const repository = new DrizzleGovernmentPlanRepository();

  async function createCandidate(): Promise<Candidate> {
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

    const candidate = Candidate.create({
      name: 'Candidato Teste',
      partyId: party.id,
      status: 'ACTIVE',
    });
    await candidateRepository.create(candidate);

    return candidate;
  }

  it('should persist and retrieve a government plan', async () => {
    const candidate = await createCandidate();
    const publishedAt = new Date();
    const plan = GovernmentPlan.create({
      candidateId: candidate.id,
      title: 'Plano de Governo Teste',
      description: 'Descricao do plano de governo.',
      publishedAt,
    });

    await repository.create(plan);

    const result = await repository.findById(plan.id);

    expect(result).not.toBeNull();
    expect(result?.id).toBe(plan.id);
    expect(result?.candidateId).toBe(plan.candidateId);
    expect(result?.title).toBe(plan.title);
    expect(result?.description).toBe(plan.description);
    expect(result?.publishedAt?.toISOString()).toBe(publishedAt.toISOString());
  });

  it('should find government plans by candidate id', async () => {
    const candidate = await createCandidate();
    const plan = GovernmentPlan.create({
      candidateId: candidate.id,
      title: 'Plano por Candidato',
      description: 'Plano associado ao candidato.',
    });

    await repository.create(plan);

    const result = await repository.findByCandidateId(candidate.id);

    expect(result.some((item) => item.id === plan.id)).toBe(true);
  });

  it('should list all government plans', async () => {
    const candidate = await createCandidate();
    const plan = GovernmentPlan.create({
      candidateId: candidate.id,
      title: 'Plano Listado',
    });

    await repository.create(plan);

    const result = await repository.findAll();

    expect(result.some((item) => item.id === plan.id)).toBe(true);
  });
});
