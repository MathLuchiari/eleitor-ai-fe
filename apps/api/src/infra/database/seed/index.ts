import 'dotenv/config';

import { and, eq } from 'drizzle-orm';

import { Candidate } from '../../../domain/entities/candidate.js';
import { Document } from '../../../domain/entities/document.js';
import { GovernmentPlan } from '../../../domain/entities/government-plan.js';
import { Party } from '../../../domain/entities/party.js';
import { Source } from '../../../domain/entities/source.js';

import { db } from '../client.js';

import {
  candidates,
  documents,
  governmentPlans,
  parties,
  sources,
} from '../schema/index.js';

import { partiesSeed } from './data/parties.js';
import { candidatesSeed } from './data/candidates.js';
import { governmentPlansSeed } from './data/government-plans.js';
import { documentsSeed } from './data/documents.js';
import { sourcesSeed } from './data/sources.js';

export async function seed() {
  console.log('Starting database seed...');

  const partyMap = new Map<string, Party>();

  for (const data of partiesSeed) {
    const [existingParty] = await db
      .select()
      .from(parties)
      .where(eq(parties.acronym, data.acronym))
      .limit(1);

    if (existingParty) {
      partyMap.set(
        existingParty.acronym,
        Party.restore({
          id: existingParty.id,
          name: existingParty.name,
          acronym: existingParty.acronym,
          number: existingParty.number,
          createdAt: existingParty.createdAt,
          updatedAt: existingParty.updatedAt,
        }),
      );

      continue;
    }

    const party = Party.create(data);

    await db.insert(parties).values({
      id: party.id,
      name: party.name,
      acronym: party.acronym,
      number: party.number,
      createdAt: party.createdAt,
      updatedAt: party.updatedAt,
    });

    partyMap.set(party.acronym, party);
  }

  const candidateMap = new Map<string, Candidate>();

  for (const data of candidatesSeed) {
    const party = partyMap.get(data.partyAcronym);

    if (!party) {
      throw new Error(
        `Party with acronym "${data.partyAcronym}" not found.`,
      );
    }

    const [existingCandidate] = await db
      .select()
      .from(candidates)
      .where(
        and(
          eq(candidates.partyId, party.id),
          eq(candidates.name, data.name),
        ),
      )
      .limit(1);

    if (existingCandidate) {
      candidateMap.set(
        existingCandidate.name,
        Candidate.restore({
          id: existingCandidate.id,
          name: existingCandidate.name,
          partyId: existingCandidate.partyId,
          status: existingCandidate.status,
          createdAt: existingCandidate.createdAt,
          updatedAt: existingCandidate.updatedAt,
        }),
      );

      continue;
    }

    const candidate = Candidate.create({
      name: data.name,
      partyId: party.id,
      status: data.status,
    });

    await db.insert(candidates).values({
      id: candidate.id,
      name: candidate.name,
      partyId: candidate.partyId,
      status: candidate.status,
      createdAt: candidate.createdAt,
      updatedAt: candidate.updatedAt,
    });

    candidateMap.set(candidate.name, candidate);
  }

  const planMap = new Map<string, GovernmentPlan>();

  for (const data of governmentPlansSeed) {
    const candidate = candidateMap.get(data.candidateName);

    if (!candidate) {
      throw new Error(
        `Candidate "${data.candidateName}" not found.`,
      );
    }

    const [existingPlan] = await db
      .select()
      .from(governmentPlans)
      .where(
        and(
          eq(governmentPlans.candidateId, candidate.id),
          eq(governmentPlans.title, data.title),
        ),
      )
      .limit(1);

    if (existingPlan) {
      planMap.set(
        existingPlan.title,
        GovernmentPlan.restore({
          id: existingPlan.id,
          candidateId: existingPlan.candidateId,
          title: existingPlan.title,
          ...(existingPlan.description === null
            ? {}
            : { description: existingPlan.description }),
          ...(existingPlan.publishedAt === null
            ? {}
            : { publishedAt: existingPlan.publishedAt }),
          createdAt: existingPlan.createdAt,
          updatedAt: existingPlan.updatedAt,
        }),
      );

      continue;
    }

    const plan = GovernmentPlan.create({
      candidateId: candidate.id,
      title: data.title,
      description: data.description,
    });

    await db.insert(governmentPlans).values({
      id: plan.id,
      candidateId: plan.candidateId,
      title: plan.title,
      description: plan.description,
      publishedAt: plan.publishedAt,
      createdAt: plan.createdAt,
      updatedAt: plan.updatedAt,
    });

    planMap.set(plan.title, plan);
  }

  const documentMap = new Map<string, Document>();

  for (const data of documentsSeed) {
    const plan = planMap.get(data.governmentPlanTitle);

    if (!plan) {
      throw new Error(
        `Government plan "${data.governmentPlanTitle}" not found.`,
      );
    }

    const [existingDocument] = await db
      .select()
      .from(documents)
      .where(
        and(
          eq(documents.governmentPlanId, plan.id),
          eq(documents.title, data.title),
        ),
      )
      .limit(1);

    if (existingDocument) {
      documentMap.set(
        existingDocument.title,
        Document.restore({
          id: existingDocument.id,
          governmentPlanId: existingDocument.governmentPlanId,
          title: existingDocument.title,
          type: existingDocument.type,
          content: existingDocument.content,
          createdAt: existingDocument.createdAt,
          updatedAt: existingDocument.updatedAt,
        }),
      );

      continue;
    }

    const document = Document.create({
      governmentPlanId: plan.id,
      title: data.title,
      type: data.type,
      content: data.content,
    });

    await db.insert(documents).values({
      id: document.id,
      governmentPlanId: document.governmentPlanId,
      title: document.title,
      type: document.type,
      content: document.content,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });

    documentMap.set(document.title, document);
  }

  for (const data of sourcesSeed) {
    const document = documentMap.get(data.documentTitle);

    if (!document) {
      throw new Error(
        `Document "${data.documentTitle}" not found.`,
      );
    }

    const [existingSource] = await db
      .select()
      .from(sources)
      .where(
        and(
          eq(sources.documentId, document.id),
          eq(sources.url, data.url),
        ),
      )
      .limit(1);

    if (existingSource) {
      continue;
    }

    const source = Source.create({
      documentId: document.id,
      title: data.title,
      url: data.url,
      publisher: data.publisher,
      type: data.type,
    });

    await db.insert(sources).values({
      id: source.id,
      documentId: source.documentId,
      title: source.title,
      url: source.url,
      publisher: source.publisher,
      type: source.type,
      publishedAt: source.publishedAt,
      createdAt: source.createdAt,
    });
  }

  console.log('Database seed completed successfully.');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seed().catch((error) => {
    console.error('Database seed failed:', error);
    process.exit(1);
  });
}
