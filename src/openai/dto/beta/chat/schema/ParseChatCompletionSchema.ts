import { z } from 'zod';
import { ChatModelSchema } from '../../assistants/schema/AssistantCreateSchema';

const ChatCompletionContentPartSchema = z.object({
  text: z.string(),
  type: z.literal('text'),
});

const ChatCompletionMessageParamSchema = z.union([
  z.object({
    content: z.string().or(z.array(ChatCompletionContentPartSchema)),
    role: z.literal('system'),
    name: z.string().optional(),
  }),
  z.object({
    content: z.string().or(z.array(ChatCompletionContentPartSchema)),
    role: z.literal('user'),
    name: z.string().optional(),
  }),
]);

export const ChatCompletionParseParams$inboundSchema = z.object({
    messages: z.array(ChatCompletionMessageParamSchema),
    model: ChatModelSchema,
    audio: z.object({
      format: z.enum(['wav', 'mp3', 'flac', 'opus', 'pcm16']),
      voice: z.enum(['alloy', 'ash', 'ballad', 'coral', 'echo', 'sage', 'shimmer', 'verse']),
    }).nullable().optional(),
    frequency_penalty: z.number().nullable().optional(),
    function_call: z.union([
      z.literal('none'),
      z.literal('auto'),
      z.object({ name: z.string() }),
    ]).optional(),
    functions:  z.array(
        z.object({
          name: z.string().min(1).max(64),  // Ensures the function name follows the rules
          description: z.string().optional(),  // Optional description
          parameters: z.record(z.string(), z.unknown()).optional(),  // Optional parameters
        })
      ).optional(),
    logit_bias: z.record(z.string(), z.number()).nullable().optional(),
    logprobs: z.boolean().nullable().optional(),
    max_completion_tokens: z.number().nullable().optional(),
    max_tokens: z.number().nullable().optional(),
    metadata: z.record(z.string(), z.string()).nullable().optional(),
    modalities: z.array(z.enum(['text', 'audio'])).nullable().optional(),
    n: z.number().nullable().optional(),
    parallel_tool_calls: z.boolean().optional(),
    prediction: z.object({
      content: z.union([z.string(), z.array(z.object({ text: z.string(), type: z.literal('text') }))]),
    }).optional(),
    presence_penalty: z.number().nullable().optional(),
    response_format: z.union([
      z.object({ type: z.literal('text') }),
      z.object({ type: z.literal('json_object') }),
      z.object({ type: z.literal('json_schema'), json_schema: z.object({}) }),
    ]).optional(),
    seed: z.number().nullable().optional(),
    service_tier: z.enum(['auto', 'default']).nullable().optional(),
    stop: z.union([z.string(), z.array(z.string())]).nullable().optional(),
    store: z.boolean().nullable().optional(),
    stream: z.boolean().nullable().optional(),
    stream_options: z.object({
      include_usage: z.boolean().optional(),
    }).nullable().optional(),
    temperature: z.number().nullable().optional(),
    tool_choice: z.union([
      z.literal('none'),
      z.literal('auto'),
      z.literal('required'),
      z.object({ function: z.object({ name: z.string() }), type: z.literal('function') }),
    ]).optional(),
    tools: z.array(z.object({
      function: z.object({
        name: z.string(),
        description: z.string().optional(),
        parameters: z.record(z.string(), z.unknown()).optional(),
        strict: z.boolean().nullable().optional(),
      }),
      type: z.literal('function'),
    })).optional(),
    top_logprobs: z.number().nullable().optional(),
    top_p: z.number().nullable().optional(),
    user: z.string().optional(),
  });
  