import { eq } from 'drizzle-orm';

import { Document } from '../../../domain/entities/document.js';
import type { DocumentRepository } from '../../../domain/repositories/document-repository.js';
import { db } from '../client.js';
import { documents } from '../schema/index.js';

export class DrizzleDocumentRepository implements DocumentRepository {
  async findById(id: string): Promise<Document | null> {
    const [row] = await db
      .select()
      .from(documents)
      .where(eq(documents.id, id))
      .limit(1);

    if (!row) {
      return null;
    }

    return this.toDomain(row);
  }

  async findByGovernmentPlanId(
    governmentPlanId: string,
  ): Promise<Document[]> {
    const rows = await db
      .select()
      .from(documents)
      .where(eq(documents.governmentPlanId, governmentPlanId));

    return rows.map((row) => this.toDomain(row));
  }

  async findAll(): Promise<Document[]> {
    const rows = await db.select().from(documents);

    return rows.map((row) => this.toDomain(row));
  }

  async create(document: Document): Promise<void> {
    await db.insert(documents).values({
      id: document.id,
      governmentPlanId: document.governmentPlanId,
      title: document.title,
      type: document.type,
      content: document.content,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }

  private toDomain(row: typeof documents.$inferSelect): Document {
    return Document.restore({
      id: row.id,
      governmentPlanId: row.governmentPlanId,
      title: row.title,
      type: row.type,
      content: row.content,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }
}
