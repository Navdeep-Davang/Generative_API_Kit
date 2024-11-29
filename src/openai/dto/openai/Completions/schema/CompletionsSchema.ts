import { z } from "zod";

export const CompletionCreateParamsNonStreaming$inboundSchema = z.object({
  model: z.string(),
  prompt: z
    .union([z.string(), z.array(z.string()), z.array(z.number())])
    .optional(),
  suffix: z.string().optional(),
  max_tokens: z.number().int().optional(),
  temperature: z.number().optional(),
  top_p: z.number().optional(),
  n: z.number().int().optional(),
  stream: z.boolean().optional(),
  logprobs: z.number().int().optional(),
  echo: z.boolean().optional(),
  stop: z.union([z.string(), z.array(z.string())]).optional(),
  presence_penalty: z.number().optional(),
  frequency_penalty: z.number().optional(),
  best_of: z.number().int().optional(),
  logit_bias: z.record(z.number()).optional(),
  user: z.string().optional(),
});

export const CompletionCreateParamsStreaming$inboundSchema = z.object({
  model: z.string(),
  prompt: z
    .union([z.string(), z.array(z.string()), z.array(z.number())])
    .optional(),
  suffix: z.string().optional(),
  max_tokens: z.number().int().optional(),
  temperature: z.number().optional(),
  top_p: z.number().optional(),
  n: z.number().int().optional(),
  stream: z.boolean().optional(),
  logprobs: z.number().int().optional(),
  echo: z.boolean().optional(),
  stop: z.union([z.string(), z.array(z.string())]).optional(),
  presence_penalty: z.number().optional(),
  frequency_penalty: z.number().optional(),
  best_of: z.number().int().optional(),
  logit_bias: z.record(z.number()).optional(),
  user: z.string().optional(),
});

export const CompletionCreateParamsBase$inboundSchema = z.object({
  model: z.string(),
  prompt: z
    .union([z.string(), z.array(z.string()), z.array(z.number())])
    .optional(),
  suffix: z.string().optional(),
  max_tokens: z.number().int().optional(),
  temperature: z.number().optional(),
  top_p: z.number().optional(),
  n: z.number().int().optional(),
  stream: z.boolean().optional(),
  logprobs: z.number().int().optional(),
  echo: z.boolean().optional(),
  stop: z.union([z.string(), z.array(z.string())]).optional(),
  presence_penalty: z.number().optional(),
  frequency_penalty: z.number().optional(),
  best_of: z.number().int().optional(),
  logit_bias: z.record(z.number()).optional(),
  user: z.string().optional(),
});

export const CompletionCreateParams$inboundSchema = z.object({
  model: z.string(),
  prompt: z
    .union([z.string(), z.array(z.string()), z.array(z.number())])
    .optional(),
  suffix: z.string().optional(),
  max_tokens: z.number().int().optional(),
  temperature: z.number().optional(),
  top_p: z.number().optional(),
  n: z.number().int().optional(),
  stream: z.boolean().optional(),
  logprobs: z.number().int().optional(),
  echo: z.boolean().optional(),
  stop: z.union([z.string(), z.array(z.string())]).optional(),
  presence_penalty: z.number().optional(),
  frequency_penalty: z.number().optional(),
  best_of: z.number().int().optional(),
  logit_bias: z.record(z.number()).optional(),
  user: z.string().optional(),
});



