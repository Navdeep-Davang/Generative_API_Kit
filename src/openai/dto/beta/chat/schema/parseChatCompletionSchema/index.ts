import { z } from 'zod';
import { ChatCompletionParseParams } from 'openai/resources/beta/chat/completions';
import { ChatCompletionCreateParamsBaseSchema } from '../common/ChatCompletionCreateParamsBaseSchema';


const ChatCompletionParseParams$inboundSchema = z.object({
  
  ...ChatCompletionCreateParamsBaseSchema.shape,

  stream: z.union([z.literal(false), z.null()]).optional(), 

}) satisfies z.ZodType<ChatCompletionParseParams>;

export { ChatCompletionParseParams$inboundSchema };
