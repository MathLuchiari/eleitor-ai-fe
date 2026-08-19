import { z } from 'zod';

export const listCandidatesByPartyParamsSchema = z.object({
  partyId: z.string().uuid(),
});