import { z } from 'zod';

export const getGovernmentPlanParamsSchema = z.object({
  id: z.string().uuid()
});