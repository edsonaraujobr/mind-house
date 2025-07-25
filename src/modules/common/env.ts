import z from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT_SERVER: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
