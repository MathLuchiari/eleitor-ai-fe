import { type FastifyReply, type FastifyRequest } from 'fastify';

import { ListGovernmentPlansByCandidateUseCase } from '../../../application/use-cases/government-plans/list-government-plans-by-candidate.js';
import { listGovernmentPlansByCandidateParamsSchema } from '../../schemas/government-plans/list-government-plans-by-candidate-schema.js';
import { governmentPlanResponse } from '../../mappers/government-plan-response.js';

export class ListGovernmentPlansByCandidateController {
  constructor(
    private readonly listGovernmentPlansByCandidateUseCase: ListGovernmentPlansByCandidateUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { candidateId } = listGovernmentPlansByCandidateParamsSchema.parse(
      request.params,
    );

    const plans = await this.listGovernmentPlansByCandidateUseCase.execute(
      candidateId,
    );

    return reply.status(200).send(plans.map(governmentPlanResponse));
  }
}
