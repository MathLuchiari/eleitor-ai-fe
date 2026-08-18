import { Party } from '../../../domain/entities/party.js';
import { type PartyRepository } from '../../../domain/repositories/party-repository.js';

export class ListPartiesUseCase {
  constructor(private readonly partyRepository: PartyRepository) {}

  async execute(): Promise<Party[]> {
    return this.partyRepository.findAll();
  }
}
