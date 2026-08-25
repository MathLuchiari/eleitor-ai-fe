import { type FastifyReply, type FastifyRequest } from 'fastify';

import { CreateCandidateUseCase } from '../../../application/use-cases/candidates/create-candidate.js';
import { createCandidateBodySchema } from '../../schemas/candidates/create-candidate-schema.js';
import { candidateResponse } from '../../mappers/candidate-response.js';

export class CreateCandidateController {
  constructor(
    private readonly createCandidateUseCase: CreateCandidateUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const input = createCandidateBodySchema.parse(request.body);

    const candidate = await this.createCandidateUseCase.execute(input);

    return reply.status(201).send(candidateResponse(candidate));
  }
}