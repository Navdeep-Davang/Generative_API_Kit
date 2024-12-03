import { z } from "zod";

export const ToolResourcesSchema = z.object({
    code_interpreter: z
      .object({
        file_ids: z.array(z.string()).max(20).optional(),
      })
      .optional(),
    file_search: z
      .object({
        vector_store_ids: z.array(z.string()).max(1).optional(),
        vector_stores: z
          .array(
            z.object({
              chunking_strategy: z.union([
                z.object({ type: z.literal('auto') }),
                z.object({
                  type: z.literal('static'),
                  static: z.object({
                    chunk_overlap_tokens: z.number().min(0),
                    max_chunk_size_tokens: z.number().min(100).max(4096),
                  }),
                }),
              ]),
              file_ids: z.array(z.string()).max(10000).optional(),
              metadata: z.unknown().optional(),
            })
          )
          .optional(),
      })
      .optional(),
  });
  