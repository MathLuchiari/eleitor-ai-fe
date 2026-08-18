import { Candidate } from '../../../domain/entities/candidate.js';
import { type CandidateRepository } from '../../../domain/repositories/candidate-repository.js';

export class GetCandidateUseCase {
  constructor(private readonly candidateRepository: CandidateRepository) {}

  async execute(id: string): Promise<Candidate | null> {
    return this.candidateRepository.findById(id);
  }
}
