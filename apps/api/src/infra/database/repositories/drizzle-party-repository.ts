import { eq } from 'drizzle-orm';

import { Party } from '../../../domain/entities/party.js';
import type { PartyRepository } from '../../../domain/repositories/party-repository.js';
import { db } from '../client.js';
import { parties } from '../schema/index.js';

export class DrizzlePartyRepository implements PartyRepository {
  async findById(id: string): Promise<Party | null> {
    const [row] = await db
      .select()
      .from(parties)
      .where(eq(parties.id, id))
      .limit(1);

    if (!row) {
      return null;
    }

    return Party.restore({
      id: row.id,
      name: row.name,
      acronym: row.acronym,
      number: row.number,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  async findByAcronym(acronym: string): Promise<Party | null> {
    const [row] = await db
      .select()
      .from(parties)
      .where(eq(parties.acronym, acronym))
      .limit(1);

    if (!row) {
      return null;
    }

    return Party.restore({
      id: row.id,
      name: row.name,
      acronym: row.acronym,
      number: row.number,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  async findByNumber(number: number): Promise<Party | null> {
    const [row] = await db
      .select()
      .from(parties)
      .where(eq(parties.number, number))
      .limit(1);

    if (!row) {
      return null;
    }

    return Party.restore({
      id: row.id,
      name: row.name,
      acronym: row.acronym,
      number: row.number,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  async findAll(): Promise<Party[]> {
    const rows = await db.select().from(parties);

    return rows.map((row) =>
      Party.restore({
        id: row.id,
        name: row.name,
        acronym: row.acronym,
        number: row.number,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      }),
    );
  }

  async create(party: Party): Promise<void> {
    await db.insert(parties).values({
      id: party.id,
      name: party.name,
      acronym: party.acronym,
      number: party.number,
      createdAt: party.createdAt,
      updatedAt: party.updatedAt,
    });
  }
}
