import { z } from 'zod';

export const MessageListParams$inboundSchema = z.object({
  before: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
  run_id: z.string().optional(),
  after: z.string().optional(),
  limit: z.number().int().optional(),
});
