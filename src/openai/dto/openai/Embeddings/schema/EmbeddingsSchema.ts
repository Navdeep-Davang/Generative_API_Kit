
import { z } from 'zod';

const EmbeddingModelEnum = z.enum([
  'text-embedding-ada-002', 
  'text-embedding-3-small', 
  'text-embedding-3-large'
]);

export const EmbeddingCreateParams$inboundSchema = z.object({
  input: z
    .union([
      z.string(),
      z.array(z.string()),
      z.array(z.number()),
      z.array(z.array(z.number()))
    ])
    .refine(value => {
      if (Array.isArray(value)) {
        if (value.length > 2048) return false;
      }
      return true;
    }, {
      message: "Input array cannot exceed 2048 dimensions."
    }),
  model: EmbeddingModelEnum,
  dimensions: z.number().optional(),
  encoding_format: z.enum(['float', 'base64']).optional(),
  user: z.string().optional()
});