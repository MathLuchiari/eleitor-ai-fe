import { z } from 'zod';

export const listGovernmentPlansByCandidateParamsSchema = z.object({
  candidateId: z.string().uuid(),
});
