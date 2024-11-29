import { z } from "zod";

const promptSchema = z.union([
  z.string(),
  z.array(z.string()),
  z.array(z.number()),
  z.array(z.array(z.number())),
  z.null(),
]).optional();

export const CompletionCreateParamsBase$inboundSchema = z.object({
  model: z.union([
    z.string(),
    z.literal('gpt-3.5-turbo-instruct'),
    z.literal('davinci-002'),
    z.literal('babbage-002'),
  ]),
  prompt: promptSchema.optional(),
  best_of: z.number().int().nullable().optional(),
  echo: z.boolean().nullable().optional(),
  frequency_penalty: z.number().nullable().optional(),
  logit_bias: z.record(z.number()).nullable().optional(),
  logprobs: z.number().int().nullable().optional(),
  max_tokens: z.number().int().nullable().optional(),
  n: z.number().int().nullable().optional(),
  presence_penalty: z.number().nullable().optional(),
  seed: z.number().nullable().optional(),
  stop: z.union([z.string(), z.array(z.string())]).nullable().optional(),
  stream: z.boolean().nullable().optional(),
  stream_options: z
    .object({
      include_usage: z.boolean().optional(),
    })
    .nullable()
    .optional(),
  suffix: z.string().nullable().optional(),
  temperature: z.number().nullable().optional(),
  top_p: z.number().nullable().optional(),
  user: z.string().optional(),
});


export const CompletionCreateParamsStreaming$inboundSchema = CompletionCreateParamsBase$inboundSchema.extend({
  stream: z.literal(true), // Ensures stream must be true for streaming
  prompt: promptSchema,
});

export const CompletionCreateParamsNonStreaming$inboundSchema = CompletionCreateParamsBase$inboundSchema.extend({
  stream: z.union([z.literal(false), z.null()]).optional(), // stream must be false or null
  prompt: promptSchema.optional(),
});

export const CompletionCreateParams$inboundSchema = z.union([
  CompletionCreateParamsNonStreaming$inboundSchema, 
  CompletionCreateParamsStreaming$inboundSchema
]);