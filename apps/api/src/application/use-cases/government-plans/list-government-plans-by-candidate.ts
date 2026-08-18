import { GovernmentPlan } from '../../../domain/entities/government-plan.js';
import { type GovernmentPlanRepository } from '../../../domain/repositories/government-plan-repository.js';

export class ListGovernmentPlansByCandidateUseCase {
  constructor(
    private readonly governmentPlanRepository: GovernmentPlanRepository,
  ) {}

  async execute(candidateId: string): Promise<GovernmentPlan[]> {
    return this.governmentPlanRepository.findByCandidateId(candidateId);
  }
}
