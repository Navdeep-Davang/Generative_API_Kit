import { z } from "zod";

// Schema for 'none', 'auto', 'required' cases
const ToolChoiceNoneSchema = z.literal('none');
const ToolChoiceAutoSchema = z.literal('auto');
const ToolChoiceRequiredSchema = z.literal('required');

// Schema for AssistantToolChoice (where function may be required)
const AssistantToolChoiceFunctionSchema = z.object({
  name: z.string().max(64, 'Function name cannot exceed 64 characters'),
});

const AssistantToolChoiceSchema = z.object({
  type: z.union([z.literal('function'), z.literal('code_interpreter'), z.literal('file_search')]),
  function: z.optional(AssistantToolChoiceFunctionSchema),
});

// Define the overall tool_choice schema combining all cases
export const ToolChoiceSchema = z.union([
  ToolChoiceNoneSchema,
  ToolChoiceAutoSchema,
  ToolChoiceRequiredSchema,
  AssistantToolChoiceSchema,
]);
