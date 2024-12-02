import { z } from "zod";
import { ChatCompletionCreateParamsNonStreamingSchema } from "./ChatCompletionCreateParamsNonStreamingSchema";
import { AutoParseableToolSchema } from "./AutoParseableToolSchema";
import { RunnableToolSchema } from "./createRunnableToolsSchema";
import { BaseFunctionsArgs } from "openai/lib/RunnableFunction";

type ToolOptions = {
  name: string;
  arguments: any;
  function?: ((args: any) => any) | undefined;
};


// Create the Zod schema for RunnableTools.
const RunnableToolsZodSchema = RunnableToolSchema<BaseFunctionsArgs>;

// Create the Zod schema for AutoParseableTool.
const AutoParseableToolZodSchema = AutoParseableToolSchema<ToolOptions, true>;


export const ChatCompletionToolRunnerParams$inboundSchema = z.object({
    ...ChatCompletionCreateParamsNonStreamingSchema.shape, // Omit 'tools' from base schema
  
    tools: z.union([
      RunnableToolsZodSchema, // Define RunnableToolSchema for RunnableTools<FunctionsArgs>
      z.array(AutoParseableToolZodSchema), // Define AutoParseableToolSchema for an array of AutoParseableTool<any, true>
    ]).optional(),
});