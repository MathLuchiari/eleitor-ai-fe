import { type FastifyReply, type FastifyRequest } from 'fastify';

import { CreateSourceUseCase } from '../../../application/use-cases/sources/create-source.js';
import { createSourceBodySchema } from '../../schemas/sources/create-source-schema.js';
import { sourceResponse } from '../../mappers/source-response.js';

export class CreateSourceController {
  constructor(
    private readonly createSourceUseCase: CreateSourceUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const input = createSourceBodySchema.parse(request.body);

    const source = await this.createSourceUseCase.execute(input);

    return reply.status(201).send(sourceResponse(source));
  }
}
