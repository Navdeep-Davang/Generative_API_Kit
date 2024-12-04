import { ChatGPTModelSchema } from "@/openai/dto/common/ChatModelSchema";
import { z } from "zod";
import { AssistantResponseFormatOptionSchema } from "../ThreadCreateAndRunSchema/AssistantResponseFormatOptionSchema";
import { ThreadSchema } from "../ThreadCreateAndRunSchema/ThreadSchema";
import { ThreadCreateAndRunParamsBase } from "openai/resources/beta/threads/threads";
import { ToolChoiceSchema } from "../ThreadCreateAndRunSchema/ToolChoiceSchema";
import { AssistantToolSchema } from "../../../../assistants/schema/AssistantCreateSchema";

export const ThreadCreateAndRunParamsBaseSchema = z.object({
  assistant_id: z.string().min(1, 'Assistant ID is required'),
  
  instructions: z.string().nullable().optional(),

  max_completion_tokens: z.number().nullable().optional(),

  max_prompt_tokens: z.number().nullable().optional(),

  metadata: z
    .unknown()
    .nullable()
    .optional(),

  model: z.union([z.string(), ChatGPTModelSchema]).nullable().optional(),

  parallel_tool_calls: z.boolean().optional(),

  response_format: AssistantResponseFormatOptionSchema.nullable().optional(),

  stream: z.boolean().nullable().optional(),

  temperature: z.number().nullable().optional(),

  thread: ThreadSchema.optional(),

  tool_choice: ToolChoiceSchema.nullable().optional(),

  tool_resources: z.object({
    code_interpreter: z.object({
      file_ids: z.array(z.string()).max(20, 'There can be a maximum of 20 file IDs').optional(),
    }).optional(),

    file_search: z.object({
      vector_store_ids: z.array(z.string()).max(1, 'There can be a maximum of 1 vector store ID').optional(),
    }).optional(),
  }).nullable().optional(),

  tools: z.array(AssistantToolSchema).nullable().optional(), 

  top_p: z.number().nullable().optional(),

  truncation_strategy: z.object({
    type: z.union([z.literal('auto'), z.literal('last_messages')]),
    last_messages: z.number().nullable().optional(),
  }).nullable().optional(),
}) satisfies z.ZodType<ThreadCreateAndRunParamsBase> ;
