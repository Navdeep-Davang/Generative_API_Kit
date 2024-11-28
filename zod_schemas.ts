import { ChatCompletionContentPartImage } from 'openai/resources/index.mjs';
import { ChatCompletionCreateParamsBase } from 'openai/src/resources/chat/completions.js';
import { ChatCompletionContentPartInputAudio } from 'openai/src/resources/index.js';
import { z, ZodTypeAny } from 'zod';

export interface ChatCompletionContentPartText {
  text: string;
  type: 'text';
}
export type ChatCompletionSystemMessageParam = {
  content: string | Array<ChatCompletionContentPartText>;
  role: 'system';
  name?: string;
};

export type ChatCompletionUserMessageParam = {
  content: string | Array<ChatCompletionContentPart>;
  role: 'user';
  name?: string;
};
export type ChatCompletionContentPart =
  | ChatCompletionContentPartText
  | ChatCompletionContentPartImage
  | ChatCompletionContentPartInputAudio;

export interface ChatCompletionAssistantMessageParam {
  role: 'assistant';
  audio?: ChatCompletionAssistantMessageParam.Audio | null;
  content?: string | Array<ChatCompletionContentPartText> | null;
  function_call?: ChatCompletionAssistantMessageParam.FunctionCall | null;
  name?: string;
  refusal?: string | null;
  tool_calls?: Array<ChatCompletionMessageToolCall>;
}
export namespace ChatCompletionAssistantMessageParam {
export interface Audio {
id: string;
}
export interface FunctionCall {
arguments: string;
name: string;
}
}
export interface ChatCompletionToolMessageParam {
  content: string | Array<ChatCompletionContentPartText>;
  role: 'tool';
  tool_call_id: string;
}
export interface ChatCompletionFunctionMessageParam {
  content: string | null;
  name: string;
  role: 'function';
}

// Placeholder types - replace with actual types
export type ChatCompletionMessageToolCall = {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
};





// ChatCompletionCreateParams types
export type ChatCompletionCreateParams =
  | ChatCompletionCreateParamsNonStreaming
  | ChatCompletionCreateParamsStreaming;
export interface ChatCompletionCreateParamsNonStreaming extends ChatCompletionCreateParamsBase {
  stream?: false | null;
}
export interface ChatCompletionCreateParamsStreaming extends ChatCompletionCreateParamsBase {
  stream: true;
}
// Assuming ChatCompletionCreateParamsBase is defined elsewhere and imported.


export const ChatCompletionCreateParamsBase$InboundSchema = z.object({
  model: z.union([z.string(), z.lazy(() => ChatModel$InboundSchema)]),
  messages: z.array(z.lazy(() => ChatCompletionMessageParam$InboundSchema)),
  audio: z.union([z.lazy(() => ChatCompletionAudioParam$InboundSchema), z.null()]).optional(),
  frequency_penalty: z.union([z.number(), z.null()]).optional(),
  function_call: z.union([
    z.literal('none'),
    z.literal('auto'),
    z.lazy(() => ChatCompletionFunctionCallOption$InboundSchema),
  ]).optional(),
  functions: z.array(z.lazy(() => FunctionDefinition$InboundSchema)).optional(),
  logit_bias: z.union([z.record(z.number()), z.null()]).optional(),
  logprobs: z.union([z.boolean(), z.null()]).optional(),
  max_completion_tokens: z.union([z.number(), z.null()]).optional(),
  max_tokens: z.union([z.number(), z.null()]).optional(),
  metadata: z.union([z.record(z.string()), z.null()]).optional(),
  modalities: z.union([z.array(z.lazy(() => ChatCompletionModality$InboundSchema)), z.null()]).optional(),
  n: z.union([z.number(), z.null()]).optional(),
  parallel_tool_calls: z.boolean().optional(),
  prediction: z.union([z.lazy(() => ChatCompletionPredictionContent$InboundSchema), z.null()]).optional(),
  presence_penalty: z.union([z.number(), z.null()]).optional(),
  response_format: z.union([
    z.lazy(() => ResponseFormatText$InboundSchema),
    z.lazy(() => ResponseFormatJSONObject$InboundSchema),
    z.lazy(() => ResponseFormatJSONSchema$InboundSchema),
  ]).optional(),
  seed: z.union([z.number(), z.null()]).optional(),
  service_tier: z.union([z.literal('auto'), z.literal('default'), z.null()]).optional(),
  stop: z.union([z.string(), z.null(), z.array(z.string())]).optional(),
  store: z.union([z.boolean(), z.null()]).optional(),
  stream: z.union([z.boolean(), z.null()]).optional(),
  stream_options: z.union([z.lazy(() => ChatCompletionStreamOptions$InboundSchema), z.null()]).optional(),
  temperature: z.union([z.number(), z.null()]).optional(),
  tool_choice: z.union([
    z.literal('none'),
    z.literal('auto'),
    z.lazy(() => ChatCompletionNamedToolChoice$InboundSchema),
  ]).optional(),
  tools: z.array(z.lazy(() => ChatCompletionTool$InboundSchema)).optional(),
  top_logprobs: z.union([z.number(), z.null()]).optional(),
  top_p: z.union([z.number(), z.null()]).optional(),
  user: z.string().optional(),
});

export const ChatCompletionMessageParam$InboundSchema = z.union([
  z.lazy(() => ChatCompletionSystemMessageParam$InboundSchema),
  z.lazy(() => ChatCompletionUserMessageParam$InboundSchema),
  z.lazy(() => ChatCompletionAssistantMessageParam$InboundSchema),
  z.lazy(() => ChatCompletionToolMessageParam$InboundSchema),
  z.lazy(() => ChatCompletionFunctionMessageParam$InboundSchema),
]);

export const ChatModel$InboundSchema = z.nativeEnum(ChatModel);

export const ChatCompletionAudioParam$InboundSchema = z.object({
  format: z.enum(['wav', 'mp3', 'flac', 'opus', 'pcm16']),
  voice: z.enum(['alloy', 'ash', 'ballad', 'coral', 'echo', 'sage', 'shimmer', 'verse']),
});

export const ChatCompletionFunctionCallOption$InboundSchema = z.object({
  name: z.string(),
});





export const ChatCompletionCreateParamsNonStreaming$InboundSchema = ChatCompletionCreateParamsBase$InboundSchema.extend({
  stream: z.union([z.literal(false), z.null()]).optional(),
});

export const ChatCompletionCreateParamsStreaming$InboundSchema = ChatCompletionCreateParamsBase$InboundSchema.extend({
  stream: z.literal(true),
});

export const ChatCompletionCreateParams$InboundSchema: ZodTypeAny = z.union([
  ChatCompletionCreateParamsNonStreaming$InboundSchema,
  ChatCompletionCreateParamsStreaming$InboundSchema,
]);

export const ChatCompletionModality$InboundSchema = z.enum(['text', 'audio']);

export const ChatCompletionPredictionContent$InboundSchema = z.object({
  content: z.union([z.string(), z.array(z.lazy(() => ChatCompletionContentPartText$InboundSchema))]),
  type: z.literal('content'),
});


export const ResponseFormatText$InboundSchema = z.object({
    type: z.literal('text'),
});

export const ResponseFormatJSONObject$InboundSchema = z.object({
    type: z.literal('json_object'),
});


export const ResponseFormatJSONSchema$InboundSchema = z.object({
  json_schema: z.lazy(() => ResponseFormatJSONSchemaJSONSchema$InboundSchema),
  type: z.literal('json_schema'),
});

export const ResponseFormatJSONSchemaJSONSchema$InboundSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    schema: z.record(z.unknown()).optional(),
    strict: z.union([z.boolean(), z.null()]).optional(),
});

export const ChatCompletionStreamOptions$InboundSchema = z.object({
  include_usage: z.boolean().optional(),
});

export const ChatCompletionTool$InboundSchema = z.object({
  function: z.lazy(() => SharedFunctionDefinition$InboundSchema),
  type: z.literal('function'),
});

export const FunctionDefinition$InboundSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    parameters: z.lazy(() => FunctionParameters$InboundSchema).optional(),
    strict: z.union([z.boolean(), z.null()]).optional(),
});

export const ChatCompletionContentPartText$InboundSchema = z.object({
  text: z.string(),
  type: z.literal('text'),
});

export const ChatCompletionContentPartImageURL$InboundSchema = z.object({
  url: z.string(),
  detail: z.enum(['auto', 'low', 'high']).optional(),
});

export const ChatCompletionContentPartImage$InboundSchema = z.object({
  image_url: z.lazy(() => ChatCompletionContentPartImageURL$InboundSchema),
  type: z.literal('image_url'),
});

export const ChatCompletionContentPartInputAudioInputAudio$InboundSchema = z.object({
  data: z.string(),
  format: z.enum(['wav', 'mp3']),
});

export const ChatCompletionContentPartInputAudio$InboundSchema = z.object({
  input_audio: z.lazy(() => ChatCompletionContentPartInputAudioInputAudio$InboundSchema),
  type: z.literal('input_audio'),
});

export const ChatCompletionSystemMessageParam$InboundSchema = z.object({
  content: z.union([z.string(), z.array(z.lazy(() => ChatCompletionContentPartText$InboundSchema))]),
  role: z.literal('system'),
  name: z.string().optional(),
});

export const ChatCompletionUserMessageParam$InboundSchema = z.object({
  content: z.union([
    z.string(),
    z.array(z.union([
      z.lazy(() => ChatCompletionContentPartText$InboundSchema),
      z.lazy(() => ChatCompletionContentPartImage$InboundSchema),
      z.lazy(() => ChatCompletionContentPartInputAudio$InboundSchema)]))]),
  role: z.literal('user'),
  name: z.string().optional(),
});

export const FunctionParameters$InboundSchema = z.record(z.unknown());

export const ChatCompletionNamedToolChoice$InboundSchema = z.object({
  function: z.object({
    name: z.string(),
  }),
  type: z.literal('function'),
});

// Placeholder schemas - replace with actual schemas
export const ChatCompletionAssistantMessageParam$InboundSchema = z.object({
  role: z.literal('assistant'),
  audio: z.union([
    z.object({
    id: z.string(),
    }).optional(),
    z.null(),
  ]).optional(),
  content: z.union([z.string(), z.array(z.lazy(() => ChatCompletionContentPartText$InboundSchema)), z.null()]).optional(),
  function_call: z.union([
    z.object({ arguments: z.string(), name: z.string() }).optional(),
    z.null(),
  ]).optional(),
  name: z.string().optional(),
  refusal: z.union([z.string(), z.null()]).optional(),
  tool_calls: z.array(z.any() /* ChatCompletionMessageToolCall */).optional(),
}); 

export const ChatCompletionToolMessageParam$InboundSchema = z.object({
  content: z.union([z.string(), z.array(z.lazy(() => ChatCompletionContentPartText$InboundSchema))]),
  role: z.literal('tool'),
  tool_call_id: z.string(),
});

export const ChatCompletionFunctionMessageParam$InboundSchema = z.object({
  content: z.union([z.string(), z.null()]),
  name: z.string(),
  role: z.literal('function'),
});

export const ChatCompletionMessageToolCall$InboundSchema = z.object({
  id: z.string(),
  type: z.literal('function'),
  function: z.object({
    name: z.string(),
    arguments: z.string(),
  }),
});


export const SharedFunctionDefinition$InboundSchema = z.object({});

// ChatCompletionCreateParamsBase schema should be imported and used here