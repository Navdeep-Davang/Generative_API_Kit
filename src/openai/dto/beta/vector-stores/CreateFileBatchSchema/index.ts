import { z } from 'zod';
import { FileChunkingStrategyParamSchema } from '../common/FileChunkingStrategyParamSchema';
import { FileBatchCreateParams } from 'openai/resources/beta/vector-stores/file-batches';


export const FileBatchCreateParams$inboundSchema = z.object({
  file_ids: z.array(z.string()),
  chunking_strategy: FileChunkingStrategyParamSchema.optional(),
}) satisfies z.ZodType<FileBatchCreateParams>;
