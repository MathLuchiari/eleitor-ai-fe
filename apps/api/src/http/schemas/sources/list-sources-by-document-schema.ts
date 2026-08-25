import { z } from 'zod';

export const listSourcesByDocumentParamsSchema = z.object({
  documentId: z.string().uuid(),
});
