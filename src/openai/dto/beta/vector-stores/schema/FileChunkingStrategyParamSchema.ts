import { z } from 'zod';

const FileChunkingStrategyParamSchema = z.union([
  // Case 1: type is 'auto'
  z.object({
    type: z.literal('auto'),
  }),

  // Case 2: type is 'static'
  z.object({
    type: z.literal('static'),
    static: z.object({
      chunk_overlap_tokens: z
        .number()
        .min(0, 'chunk_overlap_tokens must be non-negative')
        .max(4096, 'chunk_overlap_tokens must not exceed max_chunk_size_tokens'),
      max_chunk_size_tokens: z
        .number()
        .min(100, 'max_chunk_size_tokens must be at least 100')
        .max(4096, 'max_chunk_size_tokens must not exceed 4096'),
    }),
  }),
]);

export { FileChunkingStrategyParamSchema };
