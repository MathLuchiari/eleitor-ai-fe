import { type FastifyReply, type FastifyRequest } from 'fastify';

import { ListSourcesUseCase } from '../../../application/use-cases/sources/list-sources.js';
import { sourceResponse } from '../../mappers/source-response.js';

export class ListSourcesController {
  constructor(
    private readonly listSourcesUseCase: ListSourcesUseCase,
  ) {}

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const sources = await this.listSourcesUseCase.execute();

    return reply.status(200).send(sources.map(sourceResponse));
  }
}
