import { ChatGPTModelSchema } from '@/openai/dto/common/ChatModelSchema';
import { z } from 'zod';
import { AssistantResponseFormatOptionSchema } from '../../threads/schema/threads/common/AssistantResponseFormatOptionSchema';
import { AssistantToolSchema } from './common/AssistantToolSchema';

// Define ChatModel Schema (Adjust based on your app's import path)
export const ChatModelSchema = z.union([
    z.string(),
    ChatGPTModelSchema
  ]);

// ToolResources Schema
export const ToolResourcesSchema = z.object({
  code_interpreter: z
    .object({ file_ids: z.array(z.string()).optional() })
    .optional(),
  file_search: z
    .object({
      vector_store_ids: z.array(z.string()).optional(),
      vector_stores: z.array(
        z.object({
          chunking_strategy: z.union([
            z.object({ type: z.literal('auto') }),
            z.object({
              type: z.literal('static'),
              static: z.object({
                chunk_overlap_tokens: z.number(),
                max_chunk_size_tokens: z.number().min(100).max(4096),
              }),
            }),
          ]).optional(),
          file_ids: z.array(z.string()).optional(),
          metadata: z.any().optional(),
        })
      ).optional(),
    })
    .optional(),
});

// AssistantTool Schema

// Main AssistantCreateParams Schema
export const AssistantCreateParams$inboundSchema = z.object({
  model: ChatModelSchema,
  description: z.string().max(512).nullable().optional(),
  instructions: z.string().max(256_000).nullable().optional(),
  metadata: z.any().nullable().optional(),
  name: z.string().max(256).nullable().optional(),
  response_format: AssistantResponseFormatOptionSchema.nullable().optional(),
  temperature: z.number().nullable().optional(),
  tool_resources: ToolResourcesSchema.nullable().optional(),
  tools: z.array(AssistantToolSchema).optional(),
  top_p: z.number().nullable().optional(),
});
