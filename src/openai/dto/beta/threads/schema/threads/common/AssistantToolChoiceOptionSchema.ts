import { z } from "zod";

const AssistantToolChoiceFunctionSchema = z.object({
  name: z.string().max(64, 'Function name cannot exceed 64 characters'),
});

const AssistantToolChoiceSchema = z.object({
  type: z.union([z.literal('function'), z.literal('code_interpreter'), z.literal('file_search')]),
  function: z.optional(AssistantToolChoiceFunctionSchema),
});

export const AssistantToolChoiceOptionSchema = z.union([
  z.literal('none'),
  z.literal('auto'),
  z.literal('required'),
  AssistantToolChoiceSchema,
]);
