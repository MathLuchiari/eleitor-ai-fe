import { z } from 'zod';

export const createGovernmentPlanBodySchema = z.object({
  candidateId: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().min(1).optional(),
  publishedAt: z.coerce.date().optional(),
});
