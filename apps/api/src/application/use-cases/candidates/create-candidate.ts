import { Candidate, type CandidateStatus } from '../../../domain/entities/candidate.js';
import { type CandidateRepository } from '../../../domain/repositories/candidate-repository.js';

export interface CreateCandidateUseCaseInput {
  name: string;
  partyId: string;
  status: CandidateStatus;
}

export class CreateCandidateUseCase {
  constructor(private readonly candidateRepository: CandidateRepository) {}

  async execute(input: CreateCandidateUseCaseInput): Promise<Candidate> {
    const candidate = Candidate.create(input);

    await this.candidateRepository.create(candidate);

    return candidate;
  }
}
