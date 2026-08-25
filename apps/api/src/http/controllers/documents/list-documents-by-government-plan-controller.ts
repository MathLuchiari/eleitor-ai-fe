import { type FastifyReply, type FastifyRequest } from 'fastify';

import { ListDocumentsByGovernmentPlanUseCase } from '../../../application/use-cases/documents/list-documents-by-government-plan.js';
import { listDocumentsByGovernmentPlanParamsSchema } from '../../schemas/documents/list-documents-by-government-plan-schema.js';
import { documentResponse } from '../../mappers/document-response.js';

export class ListDocumentsByGovernmentPlanController {
  constructor(
    private readonly listDocumentsByGovernmentPlanUseCase: ListDocumentsByGovernmentPlanUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { governmentPlanId } = listDocumentsByGovernmentPlanParamsSchema.parse(
      request.params,
    );

    const documents = await this.listDocumentsByGovernmentPlanUseCase.execute(
      governmentPlanId,
    );

    return reply.status(200).send(documents.map(documentResponse));
  }
}
