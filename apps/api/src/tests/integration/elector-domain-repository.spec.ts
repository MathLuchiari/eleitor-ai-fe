import { inArray } from 'drizzle-orm';
import { describe, expect, it } from 'vitest';

import { Candidate } from '../../domain/entities/candidate.js';
import { Document } from '../../domain/entities/document.js';
import { GovernmentPlan } from '../../domain/entities/government-plan.js';
import { Party } from '../../domain/entities/party.js';
import { Source } from '../../domain/entities/source.js';

import { db } from '../../infra/database/client.js';
import {
  candidates,
  documents,
  governmentPlans,
  parties,
  sources,
} from '../../infra/database/schema/index.js';

import { DrizzleCandidateRepository } from '../../infra/database/repositories/drizzle-candidate-repository.js';
import { DrizzleDocumentRepository } from '../../infra/database/repositories/drizzle-document-repository.js';
import { DrizzleGovernmentPlanRepository } from '../../infra/database/repositories/drizzle-government-plan-repository.js';
import { DrizzlePartyRepository } from '../../infra/database/repositories/drizzle-party-repository.js';
import { DrizzleSourceRepository } from '../../infra/database/repositories/drizzle-source-repository.js';

type CreatedEntities = {
  partyIds: string[];
  candidateIds: string[];
  planIds: string[];
  documentIds: string[];
  sourceIds: string[];
};

async function cleanup(ids: CreatedEntities): Promise<void> {
  if (ids.sourceIds.length > 0) {
    await db
      .delete(sources)
      .where(inArray(sources.id, ids.sourceIds));
  }

  if (ids.documentIds.length > 0) {
    await db
      .delete(documents)
      .where(inArray(documents.id, ids.documentIds));
  }

  if (ids.planIds.length > 0) {
    await db
      .delete(governmentPlans)
      .where(inArray(governmentPlans.id, ids.planIds));
  }

  if (ids.candidateIds.length > 0) {
    await db
      .delete(candidates)
      .where(inArray(candidates.id, ids.candidateIds));
  }

  if (ids.partyIds.length > 0) {
    await db
      .delete(parties)
      .where(inArray(parties.id, ids.partyIds));
  }
}

async function runWithCleanup(
  test: (created: CreatedEntities) => Promise<void>,
): Promise<void> {
  const created: CreatedEntities = {
    partyIds: [],
    candidateIds: [],
    planIds: [],
    documentIds: [],
    sourceIds: [],
  };

  try {
    await test(created);
  } finally {
    await cleanup(created);
  }
}

describe('Elector domain persistence', () => {
  const partyRepository = new DrizzlePartyRepository();
  const candidateRepository = new DrizzleCandidateRepository();
  const governmentPlanRepository =
    new DrizzleGovernmentPlanRepository();
  const documentRepository = new DrizzleDocumentRepository();
  const sourceRepository = new DrizzleSourceRepository();

  it('should persist and retrieve the complete domain hierarchy', async () => {
    await runWithCleanup(async (created) => {
      const suffix = Date.now();
      const partyNumber = Number(`${suffix.toString().slice(-6)}001`);

      const party = Party.create({
        name: `Partido Teste ${suffix}`,
        acronym: `T${suffix}`.slice(0, 20),
        number: partyNumber,
      });

      await partyRepository.create(party);
      created.partyIds.push(party.id);

      const candidate = Candidate.create({
        name: `Candidato Teste ${suffix}`,
        partyId: party.id,
        status: 'ACTIVE',
      });

      await candidateRepository.create(candidate);
      created.candidateIds.push(candidate.id);

      const plan = GovernmentPlan.create({
        candidateId: candidate.id,
        title: `Plano de Governo ${suffix}`,
        description:
          'Plano de governo utilizado em teste de integração.',
      });

      await governmentPlanRepository.create(plan);
      created.planIds.push(plan.id);

      const document = Document.create({
        governmentPlanId: plan.id,
        title: `Documento ${suffix}`,
        type: 'GOVERNMENT_PLAN',
        content: 'Conteúdo do documento utilizado em teste.',
      });

      await documentRepository.create(document);
      created.documentIds.push(document.id);

      const source = Source.create({
        documentId: document.id,
        title: 'Fonte oficial de teste',
        url: `https://example.com/${suffix}`,
        publisher: 'EleitorAI Test',
        type: 'OFFICIAL_WEBSITE',
      });

      await sourceRepository.create(source);
      created.sourceIds.push(source.id);

      const persistedParty = await partyRepository.findById(party.id);
      const persistedCandidate =
        await candidateRepository.findById(candidate.id);
      const persistedPlan =
        await governmentPlanRepository.findById(plan.id);
      const persistedDocument =
        await documentRepository.findById(document.id);
      const persistedSource =
        await sourceRepository.findById(source.id);

      expect(persistedParty?.id).toBe(party.id);
      expect(persistedCandidate?.partyId).toBe(party.id);
      expect(persistedPlan?.candidateId).toBe(candidate.id);
      expect(persistedDocument?.governmentPlanId).toBe(plan.id);
      expect(persistedSource?.documentId).toBe(document.id);
    });
  });

  it('should retrieve entities through their relationships', async () => {
    await runWithCleanup(async (created) => {
      const suffix = Date.now();
      const partyNumber = Number(`${suffix.toString().slice(-6)}002`);

      const party = Party.create({
        name: `Partido Relacional ${suffix}`,
        acronym: `R${suffix}`.slice(0, 20),
        number: partyNumber,
      });

      await partyRepository.create(party);
      created.partyIds.push(party.id);

      const candidate = Candidate.create({
        name: `Candidato Relacional ${suffix}`,
        partyId: party.id,
        status: 'ACTIVE',
      });

      await candidateRepository.create(candidate);
      created.candidateIds.push(candidate.id);

      const plan = GovernmentPlan.create({
        candidateId: candidate.id,
        title: `Plano Relacional ${suffix}`,
      });

      await governmentPlanRepository.create(plan);
      created.planIds.push(plan.id);

      const document = Document.create({
        governmentPlanId: plan.id,
        title: `Documento Relacional ${suffix}`,
        type: 'GOVERNMENT_PLAN',
        content: 'Conteúdo de teste.',
      });

      await documentRepository.create(document);
      created.documentIds.push(document.id);

      const source = Source.create({
        documentId: document.id,
        title: 'Fonte Relacional',
        url: `https://example.com/source/${suffix}`,
        publisher: 'EleitorAI Test',
        type: 'OFFICIAL_WEBSITE',
      });

      await sourceRepository.create(source);
      created.sourceIds.push(source.id);

      const candidates =
        await candidateRepository.findByPartyId(party.id);

      const plans =
        await governmentPlanRepository.findByCandidateId(candidate.id);

      const documents =
        await documentRepository.findByGovernmentPlanId(plan.id);

      const sources =
        await sourceRepository.findByDocumentId(document.id);

      expect(candidates).toHaveLength(1);
      expect(candidates[0].id).toBe(candidate.id);

      expect(plans).toHaveLength(1);
      expect(plans[0].id).toBe(plan.id);

      expect(documents).toHaveLength(1);
      expect(documents[0].id).toBe(document.id);

      expect(sources).toHaveLength(1);
      expect(sources[0].id).toBe(source.id);
    });
  });
});