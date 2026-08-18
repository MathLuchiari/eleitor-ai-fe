import { describe, expect, it } from 'vitest';

import { Candidate } from '../../domain/entities/candidate.js';
import { Document } from '../../domain/entities/document.js';
import { GovernmentPlan } from '../../domain/entities/government-plan.js';
import { Party } from '../../domain/entities/party.js';
import { DrizzleCandidateRepository } from '../../infra/database/repositories/drizzle-candidate-repository.js';
import { DrizzleDocumentRepository } from '../../infra/database/repositories/drizzle-document-repository.js';
import { DrizzleGovernmentPlanRepository } from '../../infra/database/repositories/drizzle-government-plan-repository.js';
import { DrizzlePartyRepository } from '../../infra/database/repositories/drizzle-party-repository.js';

describe('DrizzleDocumentRepository', () => {
  const partyRepository = new DrizzlePartyRepository();
  const candidateRepository = new DrizzleCandidateRepository();
  const governmentPlanRepository = new DrizzleGovernmentPlanRepository();
  const repository = new DrizzleDocumentRepository();

  async function createGovernmentPlan(): Promise<GovernmentPlan> {
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

    const plan = GovernmentPlan.create({
      candidateId: candidate.id,
      title: 'Plano de Governo 2026',
      description: 'Plano de governo para testes',
    });
    await governmentPlanRepository.create(plan);

    return plan;
  }

  it('should persist and retrieve a document', async () => {
    const plan = await createGovernmentPlan();
    const document = Document.create({
      governmentPlanId: plan.id,
      title: 'Documento Teste',
      type: 'GOVERNMENT_PLAN',
      content: 'Conteudo do documento de teste.',
    });

    await repository.create(document);

    const result = await repository.findById(document.id);

    expect(result).not.toBeNull();
    expect(result?.id).toBe(document.id);
    expect(result?.governmentPlanId).toBe(document.governmentPlanId);
    expect(result?.title).toBe(document.title);
    expect(result?.type).toBe(document.type);
    expect(result?.content).toBe(document.content);
  });

  it('should find documents by government plan id', async () => {
    const plan = await createGovernmentPlan();
    const document = Document.create({
      governmentPlanId: plan.id,
      title: 'Documento por Plano',
      type: 'OFFICIAL_DOCUMENT',
      content: 'Conteudo oficial do documento.',
    });

    await repository.create(document);

    const result = await repository.findByGovernmentPlanId(plan.id);

    expect(result.some((item) => item.id === document.id)).toBe(true);
  });

  it('should list all documents', async () => {
    const plan = await createGovernmentPlan();
    const document = Document.create({
      governmentPlanId: plan.id,
      title: 'Documento Listado',
      type: 'OTHER',
      content: 'Conteudo do documento listado.',
    });

    await repository.create(document);

    const result = await repository.findAll();

    expect(result.some((item) => item.id === document.id)).toBe(true);
  });
});
