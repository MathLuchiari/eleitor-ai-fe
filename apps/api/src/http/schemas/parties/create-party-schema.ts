import { z } from 'zod';

export const createPartyBodySchema = z.object({
  name: z.string().min(1),
  acronym: z.string().min(1).max(20),
  number: z.number().int().min(1).max(99),
});