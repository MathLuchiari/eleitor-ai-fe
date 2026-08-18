import { describe, expect, it } from 'vitest';

import { Candidate } from '../../src/domain/entities/candidate';
import { Document } from '../../src/domain/entities/document';
import { GovernmentPlan } from '../../src/domain/entities/government-plan';
import { Party } from '../../src/domain/entities/party';
import { Source } from '../../src/domain/entities/source';
import { DrizzleCandidateRepository } from '../../src/infra/database/repositories/drizzle-candidate-repository';
import { DrizzleDocumentRepository } from '../../src/infra/database/repositories/drizzle-document-repository';
import { DrizzleGovernmentPlanRepository } from '../../src/infra/database/repositories/drizzle-government-plan-repository';
import { DrizzlePartyRepository } from '../../src/infra/database/repositories/drizzle-party-repository';
import { DrizzleSourceRepository } from '../../src/infra/database/repositories/drizzle-source-repository';

describe('DrizzleSourceRepository', () => {
  const partyRepository = new DrizzlePartyRepository();
  const candidateRepository = new DrizzleCandidateRepository();
  const governmentPlanRepository = new DrizzleGovernmentPlanRepository();
  const documentRepository = new DrizzleDocumentRepository();
  const repository = new DrizzleSourceRepository();

  async function createDocument(): Promise<Document> {
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

    const document = Document.create({
      governmentPlanId: plan.id,
      title: 'Documento Teste',
      type: 'GOVERNMENT_PLAN',
      content: 'Conteudo do documento de teste.',
    });
    await documentRepository.create(document);

    return document;
  }

  it('should persist and retrieve a source', async () => {
    const document = await createDocument();
    const publishedAt = new Date();
    const source = Source.create({
      documentId: document.id,
      title: 'Fonte Teste',
      url: 'https://example.com/fonte-teste',
      publisher: 'Orgao oficial',
      type: 'OFFICIAL_WEBSITE',
      publishedAt,
    });

    await repository.create(source);

    const result = await repository.findById(source.id);

    expect(result).not.toBeNull();
    expect(result?.id).toBe(source.id);
    expect(result?.documentId).toBe(source.documentId);
    expect(result?.title).toBe(source.title);
    expect(result?.url).toBe(source.url);
    expect(result?.publisher).toBe(source.publisher);
    expect(result?.type).toBe(source.type);
    expect(result?.publishedAt?.toISOString()).toBe(publishedAt.toISOString());
  });

  it('should find sources by document id', async () => {
    const document = await createDocument();
    const source = Source.create({
      documentId: document.id,
      title: 'Fonte por Documento',
      url: 'https://example.com/fonte-por-documento',
      publisher: 'TSE',
      type: 'TSE',
    });

    await repository.create(source);

    const result = await repository.findByDocumentId(document.id);

    expect(result.some((item) => item.id === source.id)).toBe(true);
  });

  it('should list all sources', async () => {
    const document = await createDocument();
    const source = Source.create({
      documentId: document.id,
      title: 'Fonte Listada',
      url: 'https://example.com/fonte-listada',
      publisher: 'Governo',
      type: 'GOVERNMENT',
    });

    await repository.create(source);

    const result = await repository.findAll();

    expect(result.some((item) => item.id === source.id)).toBe(true);
  });
});
