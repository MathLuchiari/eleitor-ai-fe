import { eq } from 'drizzle-orm';

import { Source } from '../../../domain/entities/source.js';
import type { SourceRepository } from '../../../domain/repositories/source-repository.js';
import { db } from '../client.js';
import { sources } from '../schema/index.js';

export class DrizzleSourceRepository implements SourceRepository {
  async findById(id: string): Promise<Source | null> {
    const [row] = await db
      .select()
      .from(sources)
      .where(eq(sources.id, id))
      .limit(1);

    if (!row) {
      return null;
    }

    return this.toDomain(row);
  }

  async findByDocumentId(documentId: string): Promise<Source[]> {
    const rows = await db
      .select()
      .from(sources)
      .where(eq(sources.documentId, documentId));

    return rows.map((row) => this.toDomain(row));
  }

  async findAll(): Promise<Source[]> {
    const rows = await db.select().from(sources);

    return rows.map((row) => this.toDomain(row));
  }

  async create(source: Source): Promise<void> {
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

  private toDomain(row: typeof sources.$inferSelect): Source {
    return Source.restore({
      id: row.id,
      documentId: row.documentId,
      title: row.title,
      url: row.url,
      publisher: row.publisher,
      type: row.type,
      ...(row.publishedAt === null ? {} : { publishedAt: row.publishedAt }),
      createdAt: row.createdAt,
    });
  }
}
