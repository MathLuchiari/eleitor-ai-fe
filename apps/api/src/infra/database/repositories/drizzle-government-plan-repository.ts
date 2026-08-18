import { eq } from 'drizzle-orm';

import { GovernmentPlan } from '../../../domain/entities/government-plan.js';
import type { GovernmentPlanRepository } from '../../../domain/repositories/government-plan-repository.js';
import { db } from '../client.js';
import { governmentPlans } from '../schema/index.js';

export class DrizzleGovernmentPlanRepository implements GovernmentPlanRepository {
  async findById(id: string): Promise<GovernmentPlan | null> {
    const [row] = await db
      .select()
      .from(governmentPlans)
      .where(eq(governmentPlans.id, id))
      .limit(1);

    if (!row) {
      return null;
    }

    return this.toDomain(row);
  }

  async findByCandidateId(candidateId: string): Promise<GovernmentPlan[]> {
    const rows = await db
      .select()
      .from(governmentPlans)
      .where(eq(governmentPlans.candidateId, candidateId));

    return rows.map((row) => this.toDomain(row));
  }

  async findAll(): Promise<GovernmentPlan[]> {
    const rows = await db.select().from(governmentPlans);

    return rows.map((row) => this.toDomain(row));
  }

  async create(plan: GovernmentPlan): Promise<void> {
    await db.insert(governmentPlans).values({
      id: plan.id,
      candidateId: plan.candidateId,
      title: plan.title,
      description: plan.description,
      publishedAt: plan.publishedAt,
      createdAt: plan.createdAt,
      updatedAt: plan.updatedAt,
    });
  }

  private toDomain(row: typeof governmentPlans.$inferSelect): GovernmentPlan {
    return GovernmentPlan.restore({
      id: row.id,
      candidateId: row.candidateId,
      title: row.title,
      ...(row.description === null ? {} : { description: row.description }),
      ...(row.publishedAt === null ? {} : { publishedAt: row.publishedAt }),
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }
}
