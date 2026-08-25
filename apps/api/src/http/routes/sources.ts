import { type FastifyInstance } from 'fastify';

import { createContainer } from '../../infra/container.js';
import { ListSourcesController } from '../controllers/sources/list-sources-controller.js';
import { GetSourceController } from '../controllers/sources/get-source-controller.js';
import { ListSourcesByDocumentController } from '../controllers/sources/list-sources-by-document-controller.js';
import { CreateSourceController } from '../controllers/sources/create-source-controller.js';

export async function sourcesRoutes(app: FastifyInstance) {
  const {
    listSourcesUseCase,
    getSourceUseCase,
    listSourcesByDocumentUseCase,
    createSourceUseCase,
  } = createContainer();

  const listSourcesController = new ListSourcesController(
    listSourcesUseCase,
  );

  const getSourceController = new GetSourceController(
    getSourceUseCase,
  );

  const listSourcesByDocumentController = new ListSourcesByDocumentController(
    listSourcesByDocumentUseCase,
  );

  const createSourceController = new CreateSourceController(
    createSourceUseCase,
  );

  app.get('/sources', (request, reply) =>
    listSourcesController.handle(request, reply),
  );

  app.get('/sources/:id', (request, reply) =>
    getSourceController.handle(request, reply),
  );

  app.get('/sources/document/:documentId', (request, reply) =>
    listSourcesByDocumentController.handle(request, reply),
  );

  app.post('/sources', (request, reply) =>
    createSourceController.handle(request, reply),
  );
}
