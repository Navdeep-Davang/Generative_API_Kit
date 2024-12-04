import { z } from 'zod';
import { AssistantResponseFormatOptionSchema } from '../../threads/schema/threads/common/AssistantResponseFormatOptionSchema';
import { AssistantToolSchema } from './common/AssistantToolSchema';


export const AssistantUpdateParams$inboundSchema = z.object({
  description: z.string().max(512).nullable().optional(),
  instructions: z.string().max(256_000).nullable().optional(),
  metadata: z.unknown().nullable().optional(),
  model: z.string().optional(),
  name: z.string().max(256).nullable().optional(),
  response_format: AssistantResponseFormatOptionSchema.nullable().optional(),
  temperature: z.number().min(0).max(2).nullable().optional(),
  tool_resources: z
    .object({
      code_interpreter: z
        .object({
          file_ids: z.array(z.string()).max(20).optional(),
        })
        .optional(),
      file_search: z
        .object({
          vector_store_ids: z.array(z.string()).max(1).optional(),
        })
        .optional(),
    })
    .nullable()
    .optional(),
  tools: z.array(AssistantToolSchema).optional(),
  top_p: z.number().min(0).max(1).nullable().optional(),
});
