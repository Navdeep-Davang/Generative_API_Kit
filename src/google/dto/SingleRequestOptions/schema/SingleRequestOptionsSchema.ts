import { SingleRequestOptions } from '@google/generative-ai';
import { z } from 'zod';

// Define the RequestOptions schema
export const RequestOptionsSchema = z.object({
  timeout: z.number().optional(),
  apiVersion: z.string().optional(),
  apiClient: z.string().optional(),
  baseUrl: z.string().default('https://generativelanguage.googleapis.com'),
  customHeaders: z.union([z.record(z.string()), z.instanceof(Headers)]).optional(),
});

// Define the SingleRequestOptions schema by extending RequestOptionsSchema
export const SingleRequestOptionsSchema = RequestOptionsSchema.extend({
  signal: z.instanceof(AbortSignal).optional(),
}) satisfies z.ZodType<SingleRequestOptions>;
