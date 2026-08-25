import { type Party } from '../../domain/entities/party.js';

export function partyResponse(party: Party) {
  return {
    id: party.id,
    name: party.name,
    acronym: party.acronym,
    createdAt: party.createdAt,
    updatedAt: party.updatedAt,
  };
}