import { z } from 'zod';

export const createDocumentBodySchema = z.object({
  governmentPlanId: z.string().uuid(),
  title: z.string().min(1),
  type: z.enum(['GOVERNMENT_PLAN', 'OFFICIAL_DOCUMENT', 'OTHER']),
  content: z.string().min(1),
});
