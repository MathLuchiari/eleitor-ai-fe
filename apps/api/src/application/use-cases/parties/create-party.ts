import { Party } from '../../../domain/entities/party.js';
import { type PartyRepository } from '../../../domain/repositories/party-repository.js';

export interface CreatePartyUseCaseInput {
  name: string;
  acronym: string;
  number: number;
}

export class CreatePartyUseCase {
  constructor(private readonly partyRepository: PartyRepository) {}

  async execute(input: CreatePartyUseCaseInput): Promise<Party> {
    const party = Party.create(input);

    await this.partyRepository.create(party);

    return party;
  }
}
