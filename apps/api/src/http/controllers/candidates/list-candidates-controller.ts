import { type FastifyReply, type FastifyRequest } from 'fastify';

import { ListCandidatesUseCase } from '../../../application/use-cases/candidates/list-candidates.js';

export class ListCandidatesController {
  constructor(
    private readonly listCandidatesUseCase: ListCandidatesUseCase,
  ) {}

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const candidates = await this.listCandidatesUseCase.execute();

    return reply.status(200).send(candidates);
  }
}