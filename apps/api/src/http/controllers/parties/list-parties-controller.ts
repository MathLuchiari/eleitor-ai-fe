import { type FastifyReply, type FastifyRequest } from 'fastify';

import { ListPartiesUseCase } from '../../../application/use-cases/parties/list-parties.js';
import { partyResponse } from '../../mappers/party-response.js';

export class ListPartiesController {
  constructor(private readonly listPartiesUseCase: ListPartiesUseCase) {}

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const parties = await this.listPartiesUseCase.execute();

    return reply.status(200).send(parties.map(partyResponse));
  }
}