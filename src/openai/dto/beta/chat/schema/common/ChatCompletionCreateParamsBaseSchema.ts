import { z } from 'zod';
import { ChatCompletionMessageParamSchema } from '../parseChatCompletionSchema/ChatCompletionMessageParamSchema';
import { ChatModelSchema } from '../../../assistants/schema/AssistantCreateSchema';
import { ChatCompletionResponseFormatOptionSchema } from '../parseChatCompletionSchema/ChatCompletionResponseFormatOptionSchema';
import { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';


const ChatCompletionCreateParamsBaseSchema = z.object({
  messages: z.array(ChatCompletionMessageParamSchema),
  model: ChatModelSchema,
  audio: z
    .object({
      format: z.enum(['wav', 'mp3', 'flac', 'opus', 'pcm16']),
      voice: z.enum(['alloy', 'ash', 'ballad', 'coral', 'echo', 'sage', 'shimmer', 'verse']),
    })
    .nullable()
    .optional(),
  frequency_penalty: z.number().nullable().optional(),
  function_call: z
    .union([
      z.literal('none'),
      z.literal('auto'),
      z.object({ name: z.string() }),
    ])
    .optional(),
  functions: z
    .array(
      z.object({
        name: z.string().regex(/^[a-zA-Z0-9_-]{1,64}$/),
        description: z.string().optional(),
        parameters: z.record(z.unknown()).optional(),
      })
    )
    .optional(),
  logit_bias: z.record(z.number()).nullable().optional(),
  logprobs: z.boolean().nullable().optional(),
  max_completion_tokens: z.number().nullable().optional(),
  max_tokens: z.number().nullable().optional(),
  metadata: z.record(z.string()).nullable().optional(),
  modalities: z.array(z.enum(['text', 'audio'])).nullable().optional(),
  n: z.number().nullable().optional(),
  parallel_tool_calls: z.boolean().optional(),
  prediction: z
    .object({
      content: z.union([
        z.string(),
        z.array(
          z.object({
            text: z.string(),
            type: z.literal('text'),
          })
        ),
      ]),
      type: z.literal('content'),
    })
    .nullable()
    .optional(),
  presence_penalty: z.number().nullable().optional(),
  response_format: ChatCompletionResponseFormatOptionSchema.optional(),
  seed: z.number().nullable().optional(),
  service_tier: z.enum(['auto', 'default']).nullable().optional(),
  stop: z.union([z.string(), z.array(z.string()), z.null()]).optional(),
  store: z.boolean().nullable().optional(),
  stream: z.boolean().nullable().optional(),
  stream_options: z
    .object({
      include_usage: z.boolean().optional(),
    })
    .nullable()
    .optional(),
  temperature: z.number().nullable().optional(),
  tool_choice: z
    .union([
      z.literal('none'),
      z.literal('auto'),
      z.literal('required'),
      z.object({
        function: z.object({
          name: z.string(),
        }),
        type: z.literal('function'),
      }),
    ])
    .optional(),
  tools: z
    .array(
      z.object({
        function: z.object({
          name: z.string().regex(/^[a-zA-Z0-9_-]{1,64}$/),
          description: z.string().optional(),
          parameters: z.record(z.unknown()).optional(),
          strict: z.boolean().nullable().optional(),
        }),
        type: z.literal('function'),
      })
    )
    .optional(),
  top_logprobs: z.number().nullable().optional(),
  top_p: z.number().nullable().optional(),
  user: z.string().optional(),
}) satisfies z.ZodType<ChatCompletionCreateParamsBase>;

export { ChatCompletionCreateParamsBaseSchema };
