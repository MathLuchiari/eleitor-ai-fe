import { type FastifyInstance } from 'fastify';

import { ListCandidatesController } from '../controllers/candidates/list-candidates-controller.js';
import { createContainer } from '../../infra/container.js';

export async function candidatesRoutes(app: FastifyInstance) {
  const { listCandidatesUseCase } = createContainer();

  const listCandidatesController = new ListCandidatesController(
    listCandidatesUseCase,
  );

  app.get('/candidates', (request, reply) =>
    listCandidatesController.handle(request, reply),
  );
}