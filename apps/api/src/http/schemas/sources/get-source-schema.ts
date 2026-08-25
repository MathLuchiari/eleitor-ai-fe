import { z } from 'zod';

export const getSourceParamsSchema = z.object({
  id: z.string().uuid(),
});
