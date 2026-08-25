import { type FastifyReply, type FastifyRequest } from 'fastify';

import { ListDocumentsUseCase } from '../../../application/use-cases/documents/list-documents.js';
import { documentResponse } from '../../mappers/document-response.js';

export class ListDocumentsController {
  constructor(
    private readonly listDocumentsUseCase: ListDocumentsUseCase,
  ) {}

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const documents = await this.listDocumentsUseCase.execute();

    return reply.status(200).send(documents.map(documentResponse));
  }
}
