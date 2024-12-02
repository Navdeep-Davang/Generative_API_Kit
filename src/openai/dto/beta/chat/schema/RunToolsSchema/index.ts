import { z } from "zod";
import { ChatCompletionCreateParamsNonStreamingSchema } from "./ChatCompletionCreateParamsNonStreamingSchema";
import { AutoParseableToolSchema } from "./AutoParseableToolSchema";
import { RunnableToolsSchema } from "./RunnableToolsSchema";
import { ChatCompletionCreateParamsStreamingSchema } from "./ChatCompletionCreateParamsStreamingSchema";
import { ChatCompletionStreamingToolRunnerParams } from "openai/lib/ChatCompletionStreamingRunner";
import { ChatCompletionToolRunnerParams } from "openai/lib/ChatCompletionRunner";


export const ChatCompletionToolRunnerParams$inboundSchema = z.object({
    ...ChatCompletionCreateParamsNonStreamingSchema.shape, // Omit 'tools' from base schema
  
    tools: z.union([
      RunnableToolsSchema, // Define RunnableToolsSchema for RunnableTools<FunctionsArgs>
      z.array(AutoParseableToolSchema), // Define AutoParseableToolSchema for an array of AutoParseableTool<any, true>
    ]).optional(),
}) as z.ZodType<ChatCompletionToolRunnerParams<any>>;


export const ChatCompletionStreamingToolRunnerParams$inboundSchema = z.object({
  ...ChatCompletionCreateParamsStreamingSchema.shape, // Omit 'tools' from base schema

  tools: z.union([
    RunnableToolsSchema, // Define RunnableToolsSchema for RunnableTools<FunctionsArgs>
    z.array(AutoParseableToolSchema), // Define AutoParseableToolSchema for an array of AutoParseableTool<any, true>
  ]).optional(),
}) as z.ZodType<ChatCompletionStreamingToolRunnerParams<any>>;


