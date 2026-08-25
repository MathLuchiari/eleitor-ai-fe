import { type FastifyReply, type FastifyRequest } from 'fastify';

import { CreatePartyUseCase } from '../../../application/use-cases/parties/create-party.js';
import { createPartyBodySchema } from '../../schemas/parties/create-party-schema.js';
import { partyResponse } from '../../mappers/party-response.js';

export class CreatePartyController {
  constructor(private readonly createPartyUseCase: CreatePartyUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const input = createPartyBodySchema.parse(request.body);

    const party = await this.createPartyUseCase.execute(input);

    return reply.status(201).send(partyResponse(party));
  }
}