import { AutoParseableTool } from 'openai/lib/parser';
import { z } from 'zod';

// Schema for FunctionDefinition
const FunctionDefinitionSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(64)
    .regex(/^[a-zA-Z0-9_-]+$/, 'Invalid function name format'), // Enforces allowed characters
  description: z.string().optional(), // Optional description
  parameters: z.record(z.unknown()).optional(), // Optional parameters as a JSON Schema-like object
  strict: z.boolean().nullable().optional(), // Optional strict field
});

// Schema for ChatCompletionTool
const ChatCompletionToolSchema = z.object({
  function: FunctionDefinitionSchema, // Must conform to FunctionDefinition
  type: z.literal('function'), // Fixed string "function"
});

// Schema for AutoParseableTool<any, true>
export const AutoParseableToolSchema = ChatCompletionToolSchema.extend({
  $brand: z.literal('auto-parseable-tool'), // Fixed string
  __hasFunction: z.literal(true), // Always true
  $callback: z
    .function()
    .args(z.any())
    .returns(z.any())
    .optional(), // Optional callback function
  $parseRaw: z
    .function()
    .args(z.string())
    .returns(z.any()), // Function that takes a string and returns `arguments`
}) as unknown as z.ZodType<AutoParseableTool<any, true>>;


const verify = AutoParseableToolSchema
verify satisfies z.ZodType<AutoParseableTool<any, true>>;
