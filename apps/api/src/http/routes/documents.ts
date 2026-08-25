import { type FastifyInstance } from 'fastify';

import { createContainer } from '../../infra/container.js';
import { ListDocumentsController } from '../controllers/documents/list-documents-controller.js';
import { GetDocumentController } from '../controllers/documents/get-document-controller.js';
import { ListDocumentsByGovernmentPlanController } from '../controllers/documents/list-documents-by-government-plan-controller.js';
import { CreateDocumentController } from '../controllers/documents/create-document-controller.js';

export async function documentsRoutes(app: FastifyInstance) {
  const {
    listDocumentsUseCase,
    getDocumentUseCase,
    listDocumentsByGovernmentPlanUseCase,
    createDocumentUseCase,
  } = createContainer();

  const listDocumentsController = new ListDocumentsController(
    listDocumentsUseCase,
  );

  const getDocumentController = new GetDocumentController(
    getDocumentUseCase,
  );

  const listDocumentsByGovernmentPlanController = new ListDocumentsByGovernmentPlanController(
    listDocumentsByGovernmentPlanUseCase,
  );

  const createDocumentController = new CreateDocumentController(
    createDocumentUseCase,
  );

  app.get('/documents', (request, reply) =>
    listDocumentsController.handle(request, reply),
  );

  app.get('/documents/:id', (request, reply) =>
    getDocumentController.handle(request, reply),
  );

  app.get('/documents/government-plan/:governmentPlanId', (request, reply) =>
    listDocumentsByGovernmentPlanController.handle(request, reply),
  );

  app.post('/documents', (request, reply) =>
    createDocumentController.handle(request, reply),
  );
}
