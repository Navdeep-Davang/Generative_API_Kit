import { z } from "zod";
import { ChatCompletionCreateParamsNonStreamingSchema } from "./ChatCompletionCreateParamsNonStreamingSchema";

export const ChatCompletionToolRunnerParams$inboundSchema = z.object({
    ...ChatCompletionCreateParamsNonStreamingSchema.shape, // Omit 'tools' from base schema
  
    tools: z.union([
      RunnableToolSchema, // Define RunnableToolSchema for RunnableTools<FunctionsArgs>
      z.array(AutoParseableToolSchema), // Define AutoParseableToolSchema for an array of AutoParseableTool<any, true>
    ]).optional(),
  });