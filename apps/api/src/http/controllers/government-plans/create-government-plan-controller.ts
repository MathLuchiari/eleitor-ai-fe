import { type FastifyReply, type FastifyRequest } from 'fastify';

import { CreateGovernmentPlanUseCase } from '../../../application/use-cases/government-plans/create-government-plan.js';
import { createGovernmentPlanBodySchema } from '../../schemas/government-plans/create-government-plan-schema.js';
import { governmentPlanResponse } from '../../mappers/government-plan-response.js';

export class CreateGovernmentPlanController {
  constructor(
    private readonly createGovernmentPlanUseCase: CreateGovernmentPlanUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const input = createGovernmentPlanBodySchema.parse(request.body);

    const governmentPlan = await this.createGovernmentPlanUseCase.execute(
      input,
    );

    return reply.status(201).send(governmentPlanResponse(governmentPlan));
  }
}
