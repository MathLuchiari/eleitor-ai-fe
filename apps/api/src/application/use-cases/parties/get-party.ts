import { Party } from '../../../domain/entities/party.js';
import { type PartyRepository } from '../../../domain/repositories/party-repository.js';

export class GetPartyUseCase {
  constructor(private readonly partyRepository: PartyRepository) {}

  async execute(id: string): Promise<Party | null> {
    return this.partyRepository.findById(id);
  }
}
