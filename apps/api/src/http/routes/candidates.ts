import { type FastifyInstance } from 'fastify';

import { GetCandidateController } from '../controllers/candidates/get-candidate-controller.js';
import { ListCandidatesController } from '../controllers/candidates/list-candidates-controller.js';
import { createContainer } from '../../infra/container.js';

import { GetCandidateUseCase } from '../../application/use-cases/candidates/get-candidate.js';
import { CreateCandidateController } from '../controllers/candidates/create-candidate-controller.js';

import { ListCandidatesByPartyController } from '../controllers/candidates/list-candidates-by-party-controller.js';

export async function candidatesRoutes(app: FastifyInstance) {
  const {
    listCandidatesUseCase,
    candidateRepository,
    createCandidateUseCase,
    listCandidatesByPartyUseCase
  } = createContainer();

  const listCandidatesController = new ListCandidatesController(
    listCandidatesUseCase,
  );

  const createCandidateController = new CreateCandidateController(
    createCandidateUseCase,
  );

  const getCandidateController = new GetCandidateController(
    new GetCandidateUseCase(candidateRepository),
  );

  const listCandidatesByPartyController = new ListCandidatesByPartyController(
    listCandidatesByPartyUseCase,
  );

  app.get('/candidates', (request, reply) =>
    listCandidatesController.handle(request, reply),
  );

  app.get('/candidates/:id', (request, reply) =>
    getCandidateController.handle(request, reply),
  );
  
  app.get('/candidates/party/:partyId', (request, reply) =>
    listCandidatesByPartyController.handle(request, reply),
  );

  app.post('/candidates', (request, reply) =>
    createCandidateController.handle(request, reply),
  );
}