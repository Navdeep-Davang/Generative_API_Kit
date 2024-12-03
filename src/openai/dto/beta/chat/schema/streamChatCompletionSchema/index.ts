import { z } from "zod";
import { ChatCompletionCreateParamsBaseSchema } from "../common/ChatCompletionCreateParamsBaseSchema";
import { ChatCompletionStreamParams } from "openai/lib/ChatCompletionStream";



const ChatCompletionStreamParams$inbloundSchema = z.object({
  
    ...ChatCompletionCreateParamsBaseSchema.shape,
  
    stream: z.literal(true), 
  
  }) satisfies z.ZodType<ChatCompletionStreamParams>;
  
  export { ChatCompletionStreamParams$inbloundSchema  };
  