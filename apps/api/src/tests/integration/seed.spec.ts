import { and, eq } from 'drizzle-orm';
import { describe, expect, it } from 'vitest';

import { db } from '../../infra/database/client.js';
import {
  candidates,
  documents,
  governmentPlans,
  parties,
  sources,
} from '../../infra/database/schema/index.js';
import { seed } from '../../infra/database/seed/index.js';

describe('Database seed', () => {
  it('should be idempotent', async () => {
    await seed();
    await seed();

    const seededParty = await db
      .select()
      .from(parties)
      .where(eq(parties.acronym, 'PEX'));

    expect(seededParty).toHaveLength(1);

    const party = seededParty[0];

    const seededCandidates = await db
      .select()
      .from(candidates)
      .where(
        and(
          eq(candidates.partyId, party.id),
          eq(candidates.name, 'Candidato Exemplo'),
        ),
      );

    expect(seededCandidates).toHaveLength(1);

    const candidate = seededCandidates[0];

    const seededPlans = await db
      .select()
      .from(governmentPlans)
      .where(
        and(
          eq(governmentPlans.candidateId, candidate.id),
          eq(
            governmentPlans.title,
            'Plano de Governo Exemplo',
          ),
        ),
      );

    expect(seededPlans).toHaveLength(1);

    const plan = seededPlans[0];

    const seededDocuments = await db
      .select()
      .from(documents)
      .where(
        and(
          eq(documents.governmentPlanId, plan.id),
          eq(
            documents.title,
            'Documento do Plano de Governo',
          ),
        ),
      );

    expect(seededDocuments).toHaveLength(1);

    const document = seededDocuments[0];

    const seededSources = await db
      .select()
      .from(sources)
      .where(
        and(
          eq(sources.documentId, document.id),
          eq(sources.url, 'https://example.com'),
        ),
      );

    expect(seededSources).toHaveLength(1);
  });
});