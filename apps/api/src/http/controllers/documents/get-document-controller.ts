import { type FastifyReply, type FastifyRequest } from 'fastify';

import { GetDocumentUseCase } from '../../../application/use-cases/documents/get-document.js';
import { getDocumentParamsSchema } from '../../schemas/documents/get-document-schema.js';
import { documentResponse } from '../../mappers/document-response.js';

export class GetDocumentController {
  constructor(
    private readonly getDocumentUseCase: GetDocumentUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = getDocumentParamsSchema.parse(request.params);

    const document = await this.getDocumentUseCase.execute(id);

    if (!document) {
      return reply.status(404).send({
        message: 'Document not found',
      });
    }

    return reply.status(200).send(documentResponse(document));
  }
}
