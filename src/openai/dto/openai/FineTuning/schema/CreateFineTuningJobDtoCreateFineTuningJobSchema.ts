import { z } from 'zod';

// Define the Hyperparameters schema
const HyperparametersSchema = z.object({
  batch_size: z.union([z.literal('auto'), z.number()]).optional(),
  learning_rate_multiplier: z.union([z.literal('auto'), z.number()]).optional(),
  n_epochs: z.union([z.literal('auto'), z.number()]).optional(),
});

// Define the Integration schema
const IntegrationSchema = z.object({
  type: z.literal('wandb'), // Only "wandb" is supported
  wandb: z.object({
    project: z.string(),
    entity: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

// Define the main JobCreateParams$inboundSchema
export const JobCreateParams$inboundSchema = z.object({
  model: z.union([
    z.literal('babbage-002'),
    z.literal('davinci-002'),
    z.literal('gpt-3.5-turbo'),
    z.literal('gpt-4o-mini'),
    z.string(),
  ]),
  training_file: z.string(),
  hyperparameters: HyperparametersSchema.optional(),
  integrations: z.array(IntegrationSchema).nullable().optional(),
  seed: z.number().nullable().optional(),
  suffix: z.string().max(64).nullable().optional(),
  validation_file: z.string().nullable().optional(),
});

