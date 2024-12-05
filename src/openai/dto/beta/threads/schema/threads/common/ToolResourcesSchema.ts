import { z } from "zod";
import { FileChunkingStrategyParamSchema } from "../../../../vector-stores/common/FileChunkingStrategyParamSchema";

export const ToolResourcesSchema = z.object({
    code_interpreter: z.object({
      file_ids: z.array(z.string()).max(20).optional(),
    }).optional(),
    file_search: z.object({
      vector_store_ids: z.array(z.string()).max(1).optional(),
      vector_stores: z.array(z.object({
        chunking_strategy: FileChunkingStrategyParamSchema.optional(),
        file_ids: z.array(z.string()).max(10000).optional(),
        metadata: z.unknown().optional(),
      })).optional(),
    }).optional(),
  });