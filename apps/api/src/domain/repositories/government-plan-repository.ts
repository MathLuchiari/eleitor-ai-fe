import { GovernmentPlan } from '../entities/government-plan.js';

export interface GovernmentPlanRepository {
  findById(id: string): Promise<GovernmentPlan | null>;

  findByCandidateId(candidateId: string): Promise<GovernmentPlan[]>;

  findAll(): Promise<GovernmentPlan[]>;

  create(plan: GovernmentPlan): Promise<void>;
}