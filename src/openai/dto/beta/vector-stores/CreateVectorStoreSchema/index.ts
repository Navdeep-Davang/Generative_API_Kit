import { z } from 'zod';
import { FileChunkingStrategyParamSchema } from '../common/FileChunkingStrategyParamSchema';


export const VectorStoreCreateParams$inboundSchema = z.object({
  chunking_strategy: FileChunkingStrategyParamSchema.optional(),
  
  expires_after: z
    .object({
      anchor: z.literal('last_active_at'),
      days: z.number().int(),
    })
    .optional(),

  file_ids: z.array(z.string()).optional(),

  metadata: z.unknown().optional().nullable(),

  name: z.string().optional(),
});
