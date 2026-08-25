import { type FastifyInstance } from 'fastify';

import { createContainer } from '../../infra/container.js';
import { ListGovernmentPlansController } from '../controllers/government-plans/list-government-plans-controller.js';
import { GetGovernmentPlanController } from '../controllers/government-plans/get-government-plan-controller.js';
import { ListGovernmentPlansByCandidateController } from '../controllers/government-plans/list-government-plans-by-candidate-controller.js';
import { CreateGovernmentPlanController } from '../controllers/government-plans/create-government-plan-controller.js';

export async function governmentPlansRoutes(app: FastifyInstance) {
  const {
    listGovernmentPlansUseCase,
    getGovernmentPlanUseCase,
    listGovernmentPlansByCandidateUseCase,
    createGovernmentPlanUseCase,
  } = createContainer();

  const controller = new ListGovernmentPlansController(
    listGovernmentPlansUseCase,
  );

  const getController = new GetGovernmentPlanController(
    getGovernmentPlanUseCase,
  );

  const listByCandidateController = new ListGovernmentPlansByCandidateController(
    listGovernmentPlansByCandidateUseCase,
  );

  const createController = new CreateGovernmentPlanController(
    createGovernmentPlanUseCase,
  );

  app.get('/government-plans', (request, reply) =>
    controller.handle(request, reply),
  );

  app.get('/government-plans/:id', (request, reply) =>
    getController.handle(request, reply),
  );

  app.get('/government-plans/candidate/:candidateId', (request, reply) =>
    listByCandidateController.handle(request, reply),
  );

  app.post('/government-plans', (request, reply) =>
    createController.handle(request, reply),
  );
}