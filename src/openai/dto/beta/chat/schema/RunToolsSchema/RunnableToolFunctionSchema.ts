import { z } from 'zod';
import { JSONSchema } from './JSONSchema';
import {  RunnableToolFunction } from 'openai/lib/RunnableFunction';


// Define the function schema
const functionSchema = z.object({
  function: z
    .function()
    .args(z.string(), z.object({})) // Adjust the arguments and return types as needed
    .returns(z.unknown()), // Can be adjusted based on return type
  parameters: JSONSchema, // Assuming you already have a Zod schema for JSONSchema
  description: z.string(),
  name: z.string().optional(),
  strict: z.boolean().optional(),
});

// Define the schema for the 'function' type with string Args
const runnableToolFunctionStringArgsSchema = z.object({
  type: z.literal('function'),
  function: functionSchema,
});

// Define the schema for the 'function' type with object Args
const runnableToolFunctionObjectArgsSchema = z.object({
  type: z.literal('function'),
  function: z.object({
    function: z
      .function()
      .args(z.object({})) // Args is now an object
      .returns(z.unknown()), // Adjust return type as needed
    parse: z.function().args(z.string()).returns(z.promise(z.object({}))), // Parsing function
    parameters: JSONSchema, // Same as above for JSON schema
    description: z.string(),
    name: z.string().optional(),
    strict: z.boolean().optional(),
  }),
});

// Define the final schema based on Args type
const RunnableToolFunctionSchema = z.union([
  runnableToolFunctionStringArgsSchema,
  runnableToolFunctionObjectArgsSchema,
])satisfies z.ZodType<RunnableToolFunction<object | string>>;

export { RunnableToolFunctionSchema };

