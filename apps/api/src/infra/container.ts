import { ListCandidatesUseCase } from '../application/use-cases/candidates/list-candidates.js';
import { DrizzleCandidateRepository } from './database/repositories/drizzle-candidate-repository.js';

export function createContainer() {
  const candidateRepository = new DrizzleCandidateRepository();

  const listCandidatesUseCase = new ListCandidatesUseCase(
    candidateRepository,
  );

  return {
    candidateRepository,
    listCandidatesUseCase,
  };
}