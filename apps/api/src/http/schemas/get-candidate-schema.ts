import { z } from 'zod';

export const getCandidateParamsSchema = z.object({
  id: z.string().uuid(),
});