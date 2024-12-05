import { z } from 'zod';
import { FileChunkingStrategyParamSchema } from '../common/FileChunkingStrategyParamSchema';


export const FileCreateParams$inboundSchema = z.object({
  file_id: z.string(),
  chunking_strategy: FileChunkingStrategyParamSchema.optional(),
});
