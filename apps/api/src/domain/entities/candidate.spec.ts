import { describe, expect, it } from 'vitest';
import { Candidate } from './candidate.js';

describe('Candidate', () => {
  it('should create a candidate', () => {
    const candidate = Candidate.create({
      name: 'Candidato Teste',
      partyId: 'party-id',
      status: 'ACTIVE',
    });

    expect(candidate.id).toBeDefined();
    expect(candidate.name).toBe('Candidato Teste');
    expect(candidate.partyId).toBe('party-id');
    expect(candidate.status).toBe('ACTIVE');
    expect(candidate.createdAt).toBeInstanceOf(Date);
    expect(candidate.updatedAt).toBeInstanceOf(Date);
  });
});