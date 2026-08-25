import { type FastifyReply, type FastifyRequest } from 'fastify';

import { ListGovernmentPlansUseCase } from '../../../application/use-cases/government-plans/list-government-plans.js';
import { governmentPlanResponse } from '../../mappers/government-plan-response.js';

export class ListGovernmentPlansController {
  constructor(
    private readonly listGovernmentPlansUseCase: ListGovernmentPlansUseCase,
  ) {}

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const plans = await this.listGovernmentPlansUseCase.execute();

    return reply.status(200).send(plans.map(governmentPlanResponse));
  }
}