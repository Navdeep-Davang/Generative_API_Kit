import { ChatCompletionRunner } from "openai/lib/ChatCompletionRunner";
import { ChatCompletionStreamingRunner } from "openai/lib/ChatCompletionStreamingRunner";
import { BaseFunctionsArgs, RunnableFunctionWithoutParse, RunnableFunctionWithParse, RunnableToolFunction, RunnableTools } from "openai/lib/RunnableFunction";
import { z } from "zod";

const RunnableFunctionWithoutParseSchema = z.object({
    function: z.function()
      .args(
        z.string(),
        z.union([
          z.instanceof(ChatCompletionRunner), 
          z.instanceof(ChatCompletionStreamingRunner)
        ])
      )
      .returns(z.any().promise()),
    parameters: z.object({}).passthrough(), // Placeholder for JSON Schema
    description: z.string(),
    name: z.string().optional(),
    strict: z.boolean().optional(),
  })satisfies z.ZodType<RunnableFunctionWithoutParse>;
  

  const RunnableFunctionWithParseSchema = z.object({
    function: z.function()
      .args(
        z.object({}).passthrough(), // Args should be a passthrough object
        z.union([
          z.instanceof(ChatCompletionRunner<unknown>),
          z.instanceof(ChatCompletionStreamingRunner<unknown>),
        ])
      )
      .returns(z.unknown().promise()), // Return type is unknown or a promise of unknown
    parse: z.function()
      .args(z.string()) // Input is a string
      .returns(
        z.union([z.object({}).passthrough(), z.object({}).passthrough().promise()]) // Args or Promise<Args>
      ),
    parameters: z.object({}).passthrough(), // JSON Schema placeholder
    description: z.string(),
    name: z.string().optional(),
    strict: z.boolean().optional(),
  }) satisfies z.ZodType<RunnableFunctionWithParse<object>>;
  
  
  const RunnableToolFunctionWithoutParseSchema = z.object({
    type: z.literal('function'),
    function: RunnableFunctionWithoutParseSchema,
  });
  
  const RunnableToolFunctionWithParseSchema = z.object({
    type: z.literal('function'),
    function: RunnableFunctionWithParseSchema,
  });

  export const RunnableToolFunctionSchema = z.union([
    RunnableToolFunctionWithoutParseSchema,
    RunnableToolFunctionWithParseSchema,
  ]) satisfies z.ZodType<RunnableToolFunction<object | string>>;


//   export const RunnableToolsSchema = <FunctionsArgs extends BaseFunctionsArgs>(
//     functionsArgs: FunctionsArgs
//   ) => {
//     const schema = Array.isArray(functionsArgs)
//       ? z.array(RunnableToolFunctionSchema)  // For array of RunnableToolFunction
//       : z.object(
//           Object.fromEntries(
//             Object.keys(functionsArgs).map((key) => [
//               key,
//               RunnableToolFunctionSchema,  // Using schema for each function type
//             ])
//           )
//         );
  
//     // Cast schema to unknown first, then assert the correct type
//     return schema as unknown as z.ZodType<RunnableTools<FunctionsArgs>>;
//   };

