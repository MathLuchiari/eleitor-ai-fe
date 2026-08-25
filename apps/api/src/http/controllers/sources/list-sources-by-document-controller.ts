import { type FastifyReply, type FastifyRequest } from 'fastify';

import { ListSourcesByDocumentUseCase } from '../../../application/use-cases/sources/list-sources-by-document.js';
import { listSourcesByDocumentParamsSchema } from '../../schemas/sources/list-sources-by-document-schema.js';
import { sourceResponse } from '../../mappers/source-response.js';

export class ListSourcesByDocumentController {
  constructor(
    private readonly listSourcesByDocumentUseCase: ListSourcesByDocumentUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { documentId } = listSourcesByDocumentParamsSchema.parse(
      request.params,
    );

    const sources = await this.listSourcesByDocumentUseCase.execute(
      documentId,
    );

    return reply.status(200).send(sources.map(sourceResponse));
  }
}
