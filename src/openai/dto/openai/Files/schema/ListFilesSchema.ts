import { z } from 'zod';

export const FileListParamsSchema = z.object({
  after: z.string().optional(),  
  limit: z.number().optional(),  
  order: z.enum(['asc', 'desc']).optional(),  
  purpose: z.string().optional(),  
});