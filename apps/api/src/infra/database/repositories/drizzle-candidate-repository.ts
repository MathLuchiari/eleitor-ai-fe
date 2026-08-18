import { eq } from 'drizzle-orm';

import { Candidate } from '../../../domain/entities/candidate.js';
import type { CandidateRepository } from '../../../domain/repositories/candidate-repository.js';
import { db } from '../client.js';
import { candidates } from '../schema/index.js';

export class DrizzleCandidateRepository implements CandidateRepository {
  async findById(id: string): Promise<Candidate | null> {
    const [row] = await db
      .select()
      .from(candidates)
      .where(eq(candidates.id, id))
      .limit(1);

    if (!row) {
      return null;
    }

    return this.toDomain(row);
  }

  async findByPartyId(partyId: string): Promise<Candidate[]> {
    const rows = await db
      .select()
      .from(candidates)
      .where(eq(candidates.partyId, partyId));

    return rows.map((row) => this.toDomain(row));
  }

  async findAll(): Promise<Candidate[]> {
    const rows = await db.select().from(candidates);

    return rows.map((row) => this.toDomain(row));
  }

  async create(candidate: Candidate): Promise<void> {
    await db.insert(candidates).values({
      id: candidate.id,
      name: candidate.name,
      partyId: candidate.partyId,
      status: candidate.status,
      createdAt: candidate.createdAt,
      updatedAt: candidate.updatedAt,
    });
  }

  private toDomain(row: typeof candidates.$inferSelect): Candidate {
    return Candidate.restore({
      id: row.id,
      name: row.name,
      partyId: row.partyId,
      status: row.status,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }
}
