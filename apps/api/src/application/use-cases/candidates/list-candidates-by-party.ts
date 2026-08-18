import { Candidate } from '../../../domain/entities/candidate.js';
import { type CandidateRepository } from '../../../domain/repositories/candidate-repository.js';

export class ListCandidatesByPartyUseCase {
  constructor(private readonly candidateRepository: CandidateRepository) {}

  async execute(partyId: string): Promise<Candidate[]> {
    return this.candidateRepository.findByPartyId(partyId);
  }
}
