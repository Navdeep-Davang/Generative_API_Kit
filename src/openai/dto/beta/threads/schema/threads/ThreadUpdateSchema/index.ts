import { ThreadUpdateParams } from "openai/resources/beta/threads/threads";
import { z } from "zod";

export const ThreadUpdateParams$inboundSchema = z.object({
  metadata: z    
    .unknown()
    .nullable()
    ,
  tool_resources: z
    .object({
      code_interpreter: z
        .object({
          file_ids: z
            .array(z.string())
            .max(20, 'There can be a maximum of 20 file IDs associated with the code_interpreter tool')
            .optional(),
        })
        .optional(),
      file_search: z
        .object({
          vector_store_ids: z
            .array(z.string())
            .max(1, 'There can be a maximum of 1 vector store ID attached to the thread')
            .optional(),
        })
        .optional(),
    })
    .nullable()
    .optional(),
}) satisfies z.ZodType<ThreadUpdateParams>;
