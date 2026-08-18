import { describe, expect, it } from 'vitest';
import { Party } from './party.js';

describe('Party', () => {
  it('should create a party', () => {
    const party = Party.create({
      name: 'Partido Teste',
      acronym: 'PTT',
      number: 99,
    });

    expect(party.id).toBeDefined();
    expect(party.name).toBe('Partido Teste');
    expect(party.acronym).toBe('PTT');
    expect(party.number).toBe(99);
    expect(party.createdAt).toBeInstanceOf(Date);
    expect(party.updatedAt).toBeInstanceOf(Date);
  });
});
