import { type FastifyReply, type FastifyRequest } from 'fastify';

import { GetSourceUseCase } from '../../../application/use-cases/sources/get-source.js';
import { getSourceParamsSchema } from '../../schemas/sources/get-source-schema.js';
import { sourceResponse } from '../../mappers/source-response.js';

export class GetSourceController {
  constructor(
    private readonly getSourceUseCase: GetSourceUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = getSourceParamsSchema.parse(request.params);

    const source = await this.getSourceUseCase.execute(id);

    if (!source) {
      return reply.status(404).send({
        message: 'Source not found',
      });
    }

    return reply.status(200).send(sourceResponse(source));
  }
}
