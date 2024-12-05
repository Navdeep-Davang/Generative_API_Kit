import { z } from 'zod';

export const FileBatchListFilesParams$inboundSchema = z.object({
  before: z.string().optional(),
  filter: z.enum(['in_progress', 'completed', 'failed', 'cancelled']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
  after: z.string().optional(),
  limit: z.number().int().optional(),
});
