import { type FastifyInstance } from 'fastify';

import { ListPartiesController } from '../controllers/parties/list-parties-controller.js';
import { GetPartyController } from '../controllers/parties/get-party-controller.js';
import { createContainer } from '../../infra/container.js';
import { CreatePartyController } from '../controllers/parties/create-party-controller.js';

export async function partiesRoutes(app: FastifyInstance) {
  const { listPartiesUseCase, getPartyUseCase, createPartyUseCase } = createContainer();

  const listPartiesController = new ListPartiesController(
    listPartiesUseCase,
  );

  const getPartyController = new GetPartyController(
    getPartyUseCase,
  );

  const createPartyController = new CreatePartyController(
    createPartyUseCase,
  );

  app.get('/parties', (request, reply) =>
    listPartiesController.handle(request, reply),
  );

  app.get('/parties/:id', (request, reply) =>
    getPartyController.handle(request, reply),
  );

  app.post('/parties', (request, reply) =>
    createPartyController.handle(request, reply),
  );
}