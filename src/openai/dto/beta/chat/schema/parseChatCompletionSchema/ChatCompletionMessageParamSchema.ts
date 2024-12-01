import { ChatCompletionMessageParam } from 'openai/resources';
import { z } from 'zod';

// ChatCompletionContentPart
const ChatCompletionContentPartSchema = z.union([
  z.object({
    text: z.string(),
    type: z.literal('text'),
  }),
  z.object({
    image_url: z.object({
      url: z.string(),
      detail: z.enum(['auto', 'low', 'high']).optional(),
    }),
    type: z.literal('image_url'),
  }),
  z.object({
    input_audio: z.object({
      data: z.string(),
      format: z.enum(['wav', 'mp3']),
    }),
    type: z.literal('input_audio'),
  }),
]);

// ChatCompletionSystemMessageParam
const ChatCompletionSystemMessageParamSchema = z.object({
  content: z.union([
    z.string(),
    z.array(
      z.object({
        text: z.string(),
        type: z.literal('text'),
      })
    ),
  ]),
  role: z.literal('system'),
  name: z.string().optional(),
});

// ChatCompletionUserMessageParam
const ChatCompletionUserMessageParamSchema = z.object({
  content: z.union([z.string(), z.array(ChatCompletionContentPartSchema)]),
  role: z.literal('user'),
  name: z.string().optional(),
});

// ChatCompletionAssistantMessageParam
const ChatCompletionAssistantMessageParamSchema = z.object({
  role: z.literal('assistant'),
  audio: z
    .object({
      id: z.string(),
    })
    .nullable()
    .optional(),
  content: z
    .union([
      z.string(),
      z.array(
        z.union([
          z.object({
            text: z.string(),
            type: z.literal('text'),
          }),
          z.object({
            refusal: z.string(),
            type: z.literal('refusal'),
          }),
        ])
      ),
    ])
    .nullable()
    .optional(),
  function_call: z
    .object({
      arguments: z.string(),
      name: z.string(),
    })
    .nullable()
    .optional(),
  name: z.string().optional(),
  refusal: z.string().nullable().optional(),
  tool_calls: z
    .array(
      z.object({
        id: z.string(),
        function: z.object({
          arguments: z.string(),
          name: z.string(),
        }),
        type: z.literal('function'),
      })
    )
    .optional(),
});

// ChatCompletionToolMessageParam
const ChatCompletionToolMessageParamSchema = z.object({
  content: z.union([
    z.string(),
    z.array(
      z.object({
        text: z.string(),
        type: z.literal('text'),
      })
    ),
  ]),
  role: z.literal('tool'),
  tool_call_id: z.string(),
});

// ChatCompletionFunctionMessageParam
const ChatCompletionFunctionMessageParamSchema = z.object({
  content: z.string().nullable(),
  name: z.string(),
  role: z.literal('function'),
});

// ChatCompletionMessageParam
const ChatCompletionMessageParamSchema = z.union([
  ChatCompletionSystemMessageParamSchema,
  ChatCompletionUserMessageParamSchema,
  ChatCompletionAssistantMessageParamSchema,
  ChatCompletionToolMessageParamSchema,
  ChatCompletionFunctionMessageParamSchema,
]) satisfies z.ZodType<ChatCompletionMessageParam>;

export {
  ChatCompletionMessageParamSchema
};
