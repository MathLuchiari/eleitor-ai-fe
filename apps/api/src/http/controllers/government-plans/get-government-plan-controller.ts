import { type FastifyReply, type FastifyRequest } from 'fastify';

import { GetGovernmentPlanUseCase } from '../../../application/use-cases/government-plans/get-government-plan.js';
import { getGovernmentPlanParamsSchema } from '../../schemas/government-plans/get-government-plan-schema.js';
import { governmentPlanResponse } from '../../mappers/government-plan-response.js';

export class GetGovernmentPlanController {
  constructor(
    private readonly getGovernmentPlanUseCase: GetGovernmentPlanUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = getGovernmentPlanParamsSchema.parse(request.params);

    const plan = await this.getGovernmentPlanUseCase.execute(id);

    if (!plan) {
      return reply.status(404).send({
        message: 'Government plan not found',
      });
    }

    return reply.status(200).send(governmentPlanResponse(plan));
  }
}