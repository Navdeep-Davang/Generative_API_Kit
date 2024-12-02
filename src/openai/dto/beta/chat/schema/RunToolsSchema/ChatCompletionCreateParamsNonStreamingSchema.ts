import { z } from 'zod';
import { ChatCompletionCreateParamsBaseSchema } from '../common/ChatCompletionCreateParamsBaseSchema';
import { ChatCompletionCreateParamsNonStreaming } from 'openai/resources';


const ChatCompletionCreateParamsNonStreamingSchema = z.object({
  
  ...ChatCompletionCreateParamsBaseSchema.shape,

  stream: z.union([z.literal(false), z.null()]).optional(), 

}) satisfies z.ZodType<ChatCompletionCreateParamsNonStreaming>;

export { ChatCompletionCreateParamsNonStreamingSchema };
