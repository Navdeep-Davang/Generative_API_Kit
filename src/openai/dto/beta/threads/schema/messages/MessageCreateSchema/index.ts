import { z } from 'zod';
import { MessageContentPartParamSchema } from '../common/MessageContentPartParamSchema';
import { MessageCreateParams } from 'openai/resources/beta/threads/messages';


export const MessageCreateParams$inboundSchema = z.object({
  // `content` can be a string or an array of MessageContentPartParam (using the already created schema)
  content: z.union([
    z.string(), 
    z.array(MessageContentPartParamSchema)
  ]),

  // `role` must be either 'user' or 'assistant'
  role: z.enum(['user', 'assistant']),

  // `attachments` is optional and can be an array of Attachment objects
  attachments: z.array(
    z.object({
      file_id: z.string().optional(),
      tools: z.array(
        z.object({
          type: z.enum(['code_interpreter', 'file_search']),
        })
      ).optional(),
    })
  ).optional().nullable(),

  // `metadata` is optional and can be any valid object or null
  metadata: z.unknown().optional().nullable(),
}) satisfies z.ZodType<MessageCreateParams>;
