import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  API_PORT: z.coerce
    .number()
    .int()
    .min(1)
    .max(65535)
    .default(3001),

  DATABASE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);