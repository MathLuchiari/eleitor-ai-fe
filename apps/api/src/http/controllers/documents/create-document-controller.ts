import { type FastifyReply, type FastifyRequest } from 'fastify';

import { CreateDocumentUseCase } from '../../../application/use-cases/documents/create-document.js';
import { createDocumentBodySchema } from '../../schemas/documents/create-document-schema.js';
import { documentResponse } from '../../mappers/document-response.js';

export class CreateDocumentController {
  constructor(
    private readonly createDocumentUseCase: CreateDocumentUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const input = createDocumentBodySchema.parse(request.body);

    const document = await this.createDocumentUseCase.execute(input);

    return reply.status(201).send(documentResponse(document));
  }
}
