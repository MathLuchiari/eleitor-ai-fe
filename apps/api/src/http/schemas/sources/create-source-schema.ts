import { z } from 'zod';

export const createSourceBodySchema = z.object({
  documentId: z.string().uuid(),
  title: z.string().min(1),
  url: z.string().url(),
  publisher: z.string().min(1),
  type: z.enum(['OFFICIAL_WEBSITE', 'TSE', 'GOVERNMENT', 'OTHER']),
  publishedAt: z.coerce.date().optional(),
});
