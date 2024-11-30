import { z } from 'zod';

// Define ChatModel Schema (Adjust based on your app's import path)
export const ChatModelSchema = z.union([
    z.string(),
    z.enum([
      'o1-preview',
      'o1-preview-2024-09-12',
      'o1-mini',
      'o1-mini-2024-09-12',
      'gpt-4o',
      'gpt-4o-2024-08-06',
      'gpt-4o-2024-05-13',
      'gpt-4o-realtime-preview',
      'gpt-4o-realtime-preview-2024-10-01',
      'gpt-4o-audio-preview',
      'gpt-4o-audio-preview-2024-10-01',
      'chatgpt-4o-latest',
      'gpt-4o-mini',
      'gpt-4o-mini-2024-07-18',
      'gpt-4-turbo',
      'gpt-4-turbo-2024-04-09',
      'gpt-4-0125-preview',
      'gpt-4-turbo-preview',
      'gpt-4-1106-preview',
      'gpt-4-vision-preview',
      'gpt-4',
      'gpt-4-0314',
      'gpt-4-0613',
      'gpt-4-32k',
      'gpt-4-32k-0314',
      'gpt-4-32k-0613',
      'gpt-3.5-turbo',
      'gpt-3.5-turbo-16k',
      'gpt-3.5-turbo-0301',
      'gpt-3.5-turbo-0613',
      'gpt-3.5-turbo-1106',
      'gpt-3.5-turbo-0125',
      'gpt-3.5-turbo-16k-0613',
    ]),
  ]);

// AssistantResponseFormatOption Schema
export const AssistantResponseFormatOptionSchema = z.union([
  z.literal('auto'),
  z.object({ type: z.literal('text') }),
  z.object({ type: z.literal('json_object') }),
  z.object({
    type: z.literal('json_schema'),
    json_schema: z.object({
      name: z.string().max(64),
      description: z.string().optional(),
      schema: z.record(z.string(), z.any()).optional(),
      strict: z.boolean().nullable().optional(),
    }),
  }),
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
