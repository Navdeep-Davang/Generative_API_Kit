import { BaseFunctionsArgs, RunnableTools } from "openai/lib/RunnableFunction";
import { z, ZodType } from "zod";  // Ensure ZodType is imported
import { RunnableToolFunctionSchema } from "./RunnableToolFunctionSchema";

export const RunnableToolsSchema = z.union([
    // Case 1: When FunctionsArgs is `any[]`, it should be an array of RunnableToolFunction<any>
    z.array(RunnableToolFunctionSchema),
  
    // Case 2: When FunctionsArgs is specific, it should be an object with index-like keys
    z.record(
      z.union([z.string(), z.number()]), // Allows string or numeric keys
      RunnableToolFunctionSchema // Each key maps to a RunnableToolFunction
    ),
  ]) as unknown as z.ZodType<RunnableTools<BaseFunctionsArgs>>;

  const verify = RunnableToolsSchema
  verify satisfies z.ZodType<RunnableTools<BaseFunctionsArgs>>;