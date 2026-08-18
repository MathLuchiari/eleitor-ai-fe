import { Candidate } from '../entities/candidate.js';

export interface CandidateRepository {
  findById(id: string): Promise<Candidate | null>;

  findByPartyId(partyId: string): Promise<Candidate[]>;

  findAll(): Promise<Candidate[]>;

  create(candidate: Candidate): Promise<void>;
}