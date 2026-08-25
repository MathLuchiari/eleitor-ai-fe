import { type GovernmentPlan } from '../../domain/entities/government-plan.js';

export function governmentPlanResponse(plan: GovernmentPlan) {
  return {
    id: plan.id,
    candidateId: plan.candidateId,
    title: plan.title,
    description: plan.description,
    createdAt: plan.createdAt,
    updatedAt: plan.updatedAt,
  };
}