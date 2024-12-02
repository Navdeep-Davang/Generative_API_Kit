import { z } from 'zod';
import { ChatCompletionCreateParamsBaseSchema } from '../common/ChatCompletionCreateParamsBaseSchema';
import { ChatCompletionCreateParamsStreaming } from 'openai/resources';


const ChatCompletionCreateParamsStreamingSchema = z.object({
  
  ...ChatCompletionCreateParamsBaseSchema.shape,

  stream: z.literal(true), 

}) satisfies z.ZodType<ChatCompletionCreateParamsStreaming>;

export { ChatCompletionCreateParamsStreamingSchema };
