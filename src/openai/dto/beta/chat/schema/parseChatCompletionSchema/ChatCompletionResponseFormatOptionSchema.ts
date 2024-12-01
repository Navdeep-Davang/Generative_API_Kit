import { z } from 'zod';

const ChatCompletionResponseFormatOptionSchema = z.union([
  z.object({
    type: z.literal('text'),
  }),
  z.object({
    type: z.literal('json_object'),
  }),
  z.object({
    json_schema: z.object({
      name: z.string().regex(/^[a-zA-Z0-9_-]{1,64}$/),
      description: z.string().optional(),
      schema: z.record(z.unknown()).optional(),
      strict: z.boolean().nullable().optional(),
    }),
    type: z.literal('json_schema'),
  }),
]);

export { ChatCompletionResponseFormatOptionSchema };
