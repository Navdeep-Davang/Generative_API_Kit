import { z } from 'zod';

export const VectorStoreListParams$inboundSchema = z.object({
  before: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
  after: z.string().optional(),
  limit: z.number().int().optional(),
});
