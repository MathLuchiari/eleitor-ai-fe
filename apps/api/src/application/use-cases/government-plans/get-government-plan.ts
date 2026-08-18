import { GovernmentPlan } from '../../../domain/entities/government-plan.js';
import { type GovernmentPlanRepository } from '../../../domain/repositories/government-plan-repository.js';

export class GetGovernmentPlanUseCase {
  constructor(
    private readonly governmentPlanRepository: GovernmentPlanRepository,
  ) {}

  async execute(id: string): Promise<GovernmentPlan | null> {
    return this.governmentPlanRepository.findById(id);
  }
}
