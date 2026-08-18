import { GovernmentPlan } from '../../../domain/entities/government-plan.js';
import { type GovernmentPlanRepository } from '../../../domain/repositories/government-plan-repository.js';

export interface CreateGovernmentPlanUseCaseInput {
  candidateId: string;
  title: string;
  description?: string;
  publishedAt?: Date;
}

export class CreateGovernmentPlanUseCase {
  constructor(
    private readonly governmentPlanRepository: GovernmentPlanRepository,
  ) {}

  async execute(
    input: CreateGovernmentPlanUseCaseInput,
  ): Promise<GovernmentPlan> {
    const governmentPlan = GovernmentPlan.create(input);

    await this.governmentPlanRepository.create(governmentPlan);

    return governmentPlan;
  }
}
