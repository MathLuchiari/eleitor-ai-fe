import { Party } from '../entities/party.js';

export interface PartyRepository {
  findById(id: string): Promise<Party | null>;

  findByAcronym(acronym: string): Promise<Party | null>;

  findByNumber(number: number): Promise<Party | null>;

  findAll(): Promise<Party[]>;

  create(party: Party): Promise<void>;
}