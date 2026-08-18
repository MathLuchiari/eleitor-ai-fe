import { Candidate } from '../../../domain/entities/candidate.js';
import { type CandidateRepository } from '../../../domain/repositories/candidate-repository.js';

export class ListCandidatesUseCase {
  constructor(private readonly candidateRepository: CandidateRepository) {}

  async execute(): Promise<Candidate[]> {
    return this.candidateRepository.findAll();
  }
}