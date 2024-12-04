import { z } from "zod";
import { MessageContentPartParamSchema } from "../../messages/common/MessageContentPartParamSchema";

export const MessageSchema = z.object({
    content: z.union([z.string(), z.array(MessageContentPartParamSchema)]),
    role: z.enum(['user', 'assistant']),
    metadata: z.unknown().nullable(),
    attachments: z
      .array(
        z.object({
          file_id: z.string().optional(),
          tools: z
            .array(
              z.union([
                z.object({ type: z.literal('code_interpreter') }),
                z.object({ type: z.literal('file_search') }),
              ])
            )
            .optional(),
        })
      )
      .optional()
      .nullable(),
  });