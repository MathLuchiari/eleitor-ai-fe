import { type Candidate } from '../../domain/entities/candidate.js';

export function candidateResponse(candidate: Candidate) {
  return {
    id: candidate.id,
    name: candidate.name,
    partyId: candidate.partyId,
    status: candidate.status,
    createdAt: candidate.createdAt,
    updatedAt: candidate.updatedAt,
  };
}