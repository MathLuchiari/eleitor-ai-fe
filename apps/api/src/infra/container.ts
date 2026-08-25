import { ListCandidatesUseCase } from '../application/use-cases/candidates/list-candidates.js';
import { DrizzleCandidateRepository } from './database/repositories/drizzle-candidate-repository.js';
import { CreateCandidateUseCase } from '../application/use-cases/candidates/create-candidate.js';
import { ListCandidatesByPartyUseCase } from '../application/use-cases/candidates/list-candidates-by-party.js';

import { ListPartiesUseCase } from '../application/use-cases/parties/list-parties.js';
import { DrizzlePartyRepository } from './database/repositories/drizzle-party-repository.js';
import { GetPartyUseCase } from '../application/use-cases/parties/get-party.js';
import { CreatePartyUseCase } from '../application/use-cases/parties/create-party.js';

import { ListGovernmentPlansUseCase } from '../application/use-cases/government-plans/list-government-plans.js';
import { DrizzleGovernmentPlanRepository } from './database/repositories/drizzle-government-plan-repository.js';
import { GetGovernmentPlanUseCase } from '../application/use-cases/government-plans/get-government-plan.js';
import { ListGovernmentPlansByCandidateUseCase } from '../application/use-cases/government-plans/list-government-plans-by-candidate.js';
import { CreateGovernmentPlanUseCase } from '../application/use-cases/government-plans/create-government-plan.js';

import { ListDocumentsUseCase } from '../application/use-cases/documents/list-documents.js';
import { DrizzleDocumentRepository } from './database/repositories/drizzle-document-repository.js';

export function createContainer() {
  const candidateRepository = new DrizzleCandidateRepository();
  const partyRepository = new DrizzlePartyRepository();
  const governmentPlanRepository = new DrizzleGovernmentPlanRepository();
  const documentRepository = new DrizzleDocumentRepository();

  return {
    candidateRepository,
    listCandidatesUseCase: new ListCandidatesUseCase(candidateRepository),
    createCandidateUseCase: new CreateCandidateUseCase(candidateRepository),
    listCandidatesByPartyUseCase: new ListCandidatesByPartyUseCase(candidateRepository),

    partyRepository,
    listPartiesUseCase: new ListPartiesUseCase(partyRepository),
    getPartyUseCase: new GetPartyUseCase(partyRepository),
    createPartyUseCase: new CreatePartyUseCase(partyRepository),

    governmentPlanRepository,
    listGovernmentPlansUseCase: new ListGovernmentPlansUseCase(governmentPlanRepository),
    getGovernmentPlanUseCase: new GetGovernmentPlanUseCase(governmentPlanRepository),
    listGovernmentPlansByCandidateUseCase: new ListGovernmentPlansByCandidateUseCase(governmentPlanRepository),
    createGovernmentPlanUseCase: new CreateGovernmentPlanUseCase(governmentPlanRepository),

    documentRepository,
    listDocumentsUseCase: new ListDocumentsUseCase(documentRepository),
  };
}