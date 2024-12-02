import { BaseFunctionsArgs, RunnableFunctionWithoutParse, RunnableFunctionWithParse, RunnableToolFunction, RunnableTools } from 'openai/lib/RunnableFunction';
import { z } from 'zod';
import { JSONSchema } from './JSONSchema';

// Define RunnableFunctionWithoutParse schema
const RunnableFunctionWithoutParseSchema = z.object({
  function: z
    .function()
    .args(z.string(), z.object({ /* define your runner structure here */ }))
    .returns(z.promise(z.unknown())),
  parameters: JSONSchema,
  description: z.string(),
  name: z.string().optional(),
  strict: z.boolean().optional(),
}) satisfies z.ZodType<RunnableFunctionWithoutParse>;

// Define the schema for RunnableFunctionWithParse
const RunnableFunctionWithParseSchema = <Args extends object>(argsSchema: z.ZodType<Args, any, any>) =>
  z.object({
    function: z
      .function()
      .args(argsSchema, z.unknown())  // args are based on provided schema, runner is unknown
      .returns(z.unknown()),  // Return type can be refined further
    parse: z
      .function()
      .args(z.string())  // Parse accepts a string input
      .returns(argsSchema),  // Returns the parsed args based on the provided schema
    parameters: JSONSchema,  // Assuming JSONSchema
    description: z.string(),
    name: z.string().optional(),
    strict: z.boolean().optional(),
  }) satisfies z.ZodType<RunnableFunctionWithParse<Args>>;


// Define the RunnableToolFunction schema
const RunnableToolFunctionSchema = <Args extends object | string>(
  argsSchema: Args extends string ? z.ZodType<any, any, any> : z.ZodType<Args, any, any>
) =>
  z.union([
    // Case 1: Args is string (RunnableToolFunctionWithoutParse)
    z.object({
      type: z.literal('function'),
      function: RunnableFunctionWithoutParseSchema,
    }).strict(),  // Ensures the object is strictly validated with no extra properties

    // Case 2: Args is an object (RunnableToolFunctionWithParse)
    z.object({
      type: z.literal('function'),
      function: RunnableFunctionWithParseSchema(argsSchema),
    }).strict(),  // Ensures the object is strictly validated with no extra properties
  ]) satisfies z.ZodType<RunnableToolFunction<Args>>;




// Example of how to use this for RunnableTools<FunctionsArgs>:

// Case 1: FunctionsArgs is any[] -> array of RunnableToolFunction<any>
export const RunnableToolsSchema = z.union([
  z.array(RunnableToolFunctionSchema(z.any())), // For any[] (array)
  z.record(z.string(), RunnableToolFunctionSchema(z.object({}))), // For non-array object
]) satisfies z.ZodType<RunnableTools<BaseFunctionsArgs>>;
