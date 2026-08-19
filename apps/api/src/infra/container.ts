import { ListCandidatesUseCase } from '../application/use-cases/candidates/list-candidates.js';
import { DrizzleCandidateRepository } from './database/repositories/drizzle-candidate-repository.js';
import { CreateCandidateUseCase } from '../application/use-cases/candidates/create-candidate.js';
import { ListCandidatesByPartyUseCase } from '../application/use-cases/candidates/list-candidates-by-party.js';

export function createContainer() {
  const candidateRepository = new DrizzleCandidateRepository();

  const createCandidateUseCase = new CreateCandidateUseCase(
    candidateRepository,
  );

  const listCandidatesUseCase = new ListCandidatesUseCase(
    candidateRepository,
  );
  
  const listCandidatesByPartyUseCase = new ListCandidatesByPartyUseCase(
    candidateRepository,
  );

  return {
    candidateRepository,
    listCandidatesUseCase,
    createCandidateUseCase,
    listCandidatesByPartyUseCase
  };
}