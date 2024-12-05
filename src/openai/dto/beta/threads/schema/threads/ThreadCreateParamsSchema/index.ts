import { z } from 'zod';
import { ThreadCreateParams } from 'openai/resources/beta/threads/threads';
import { MessageSchema } from './MessageSchema';
import { ToolResourcesSchema } from '../common/ToolResourcesSchema';
  

export const ThreadCreateParams$inboundSchema = z.object({
    messages: z.array(MessageSchema).optional(),
    metadata: z.unknown().nullable().optional(),
    tool_resources: ToolResourcesSchema.nullable().optional(),
}) satisfies z.ZodType<ThreadCreateParams> 
  