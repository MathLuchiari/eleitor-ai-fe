import { type FastifyReply, type FastifyRequest } from 'fastify';

import { GetPartyUseCase } from '../../../application/use-cases/parties/get-party.js';
import { getPartyParamsSchema } from '../../schemas/parties/get-party-schema.js';
import { partyResponse } from '../../mappers/party-response.js';

export class GetPartyController {
  constructor(private readonly getPartyUseCase: GetPartyUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = getPartyParamsSchema.parse(request.params);

    const party = await this.getPartyUseCase.execute(id);

    if (!party) {
      return reply.status(404).send({
        message: 'Party not found',
      });
    }

    return reply.status(200).send(partyResponse(party));
  }
}