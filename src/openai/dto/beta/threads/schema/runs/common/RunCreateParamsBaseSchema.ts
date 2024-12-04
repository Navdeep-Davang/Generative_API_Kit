import { z } from "zod";
import { AdditionalMessageSchema } from "./AdditionalMessageSchema";
import { ChatGPTModelSchema } from "@/openai/dto/common/ChatModelSchema";
import { AssistantResponseFormatOptionSchema } from "../../threads/common/AssistantResponseFormatOptionSchema";
import { AssistantToolChoiceOptionSchema } from "../../threads/common/AssistantToolChoiceOptionSchema";
import { AssistantToolSchema } from "@/openai/dto/beta/assistants/schema/common/AssistantToolSchema";
import { RunCreateParamsBase } from "openai/resources/beta/threads/runs/runs";

export const RunCreateParamsBaseSchema = z.object({
  assistant_id: z.string(),

  include: z
    .array(z.literal('step_details.tool_calls[*].file_search.results[*].content'))
    .optional(),

  additional_instructions: z.string().nullable().optional(),

  additional_messages: z.array(AdditionalMessageSchema).nullable().optional(),

  instructions: z.string().nullable().optional(),

  max_completion_tokens: z.number().nullable().optional(),

  max_prompt_tokens: z.number().nullable().optional(),

  metadata: z.unknown().nullable().optional(),

  model: z.union([z.string(), ChatGPTModelSchema]).nullable().optional(),

  parallel_tool_calls: z.boolean().optional(),

  response_format: AssistantResponseFormatOptionSchema.nullable().optional(),

  stream: z.boolean().nullable().optional(),

  temperature: z.number().min(0).max(2).nullable().optional(),

  tool_choice: AssistantToolChoiceOptionSchema.nullable().optional(),

  tools: z.array(AssistantToolSchema).nullable().optional(),

  top_p: z.number().min(0).max(1).nullable().optional(),

  truncation_strategy: z
    .object({
      type: z.enum(['auto', 'last_messages']),
      last_messages: z.number().nullable().optional(),
    })
    .nullable()
    .optional(),
})satisfies z.ZodType<RunCreateParamsBase>;
