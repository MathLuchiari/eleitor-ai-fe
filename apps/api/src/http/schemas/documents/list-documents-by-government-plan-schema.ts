import { z } from 'zod';

export const listDocumentsByGovernmentPlanParamsSchema = z.object({
  governmentPlanId: z.string().uuid(),
});
