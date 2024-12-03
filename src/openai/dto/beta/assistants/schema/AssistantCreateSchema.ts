import { ChatGPTModelSchema } from '@/openai/dto/common/ChatModelSchema';
import { z } from 'zod';
import { AssistantResponseFormatOptionSchema } from '../../threads/schema/threads/ThreadCreateAndRunSchema/AssistantResponseFormatOptionSchema';

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
export const AssistantToolSchema = z.union([
  z.object({ type: z.literal('code_interpreter') }),
  z.object({
    type: z.literal('file_search'),
    file_search: z
      .object({
        max_num_results: z.number().min(1).max(50).optional(),
        ranking_options: z
          .object({
            score_threshold: z.number().min(0).max(1),
            ranker: z.union([z.literal('auto'), z.literal('default_2024_08_21')])
              .optional(),
          })
          .optional(),
      })
      .optional(),
  }),
  z.object({
    type: z.literal('function'),
    function: z.object({
      name: z.string().max(64),
      description: z.string().optional(),
      parameters: z.record(z.string(), z.any()).optional(),
      strict: z.boolean().nullable().optional(),
    }),
  }),
]);

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
