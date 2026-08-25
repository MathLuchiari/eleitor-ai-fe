import { z } from 'zod';

export const getPartyParamsSchema = z.object({
  id: z.string().uuid(),
});