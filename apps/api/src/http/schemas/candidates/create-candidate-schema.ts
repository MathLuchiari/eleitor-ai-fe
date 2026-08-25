import { z } from 'zod';

export const createCandidateBodySchema = z.object({
  name: z.string().min(1),
  partyId: z.string().uuid(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
});