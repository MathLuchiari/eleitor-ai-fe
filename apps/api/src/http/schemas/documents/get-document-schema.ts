import { z } from 'zod';

export const getDocumentParamsSchema = z.object({
  id: z.string().uuid(),
});
