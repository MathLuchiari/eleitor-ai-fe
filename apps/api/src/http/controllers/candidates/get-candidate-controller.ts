import { type FastifyReply, type FastifyRequest } from 'fastify';

import { GetCandidateUseCase } from '../../../application/use-cases/candidates/get-candidate.js';
import { getCandidateParamsSchema } from '../../schemas/candidates/get-candidate-schema.js';
import { candidateResponse } from '../../mappers/candidate-response.js';

export class GetCandidateController {
  constructor(
    private readonly getCandidateUseCase: GetCandidateUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = getCandidateParamsSchema.parse(request.params);

    const candidate = await this.getCandidateUseCase.execute(id);

    if (!candidate) {
      return reply.status(404).send({
        message: 'Candidate not found',
      });
    }

    return reply.status(200).send(candidateResponse(candidate));
  }
}