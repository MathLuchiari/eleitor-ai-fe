import { type FastifyInstance } from 'fastify';

import { createContainer } from '../../infra/container.js';
import { ListDocumentsController } from '../controllers/documents/list-documents-controller.js';

export async function documentsRoutes(app: FastifyInstance) {
  const { listDocumentsUseCase } = createContainer();

  const listDocumentsController = new ListDocumentsController(
    listDocumentsUseCase,
  );

  app.get('/documents', (request, reply) =>
    listDocumentsController.handle(request, reply),
  );
}
