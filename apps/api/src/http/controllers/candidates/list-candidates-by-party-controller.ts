import { type FastifyReply, type FastifyRequest } from 'fastify';

import { ListCandidatesByPartyUseCase } from '../../../application/use-cases/candidates/list-candidates-by-party.js';
import { listCandidatesByPartyParamsSchema } from '../../schemas/candidates/list-candidates-by-party-schema.js';
import { candidateResponse } from '../../mappers/candidate-response.js';

export class ListCandidatesByPartyController {
  constructor(
    private readonly listCandidatesByPartyUseCase: ListCandidatesByPartyUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { partyId } = listCandidatesByPartyParamsSchema.parse(
      request.params,
    );

    const candidates = await this.listCandidatesByPartyUseCase.execute(
      partyId,
    );

    return reply.status(200).send(candidates.map(candidateResponse));
  }
}