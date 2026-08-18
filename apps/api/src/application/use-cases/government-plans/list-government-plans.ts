import { GovernmentPlan } from '../../../domain/entities/government-plan.js';
import { type GovernmentPlanRepository } from '../../../domain/repositories/government-plan-repository.js';

export class ListGovernmentPlansUseCase {
  constructor(
    private readonly governmentPlanRepository: GovernmentPlanRepository,
  ) {}

  async execute(): Promise<GovernmentPlan[]> {
    return this.governmentPlanRepository.findAll();
  }
}
