import { z } from 'zod';

export const ImageGenerateParams$inboundSchema = z.object({
  prompt: z.string().max(4000, {
    message: 'Prompt length must be less than or equal to 4000 characters.',
  }),

  model: z.union([z.literal('dall-e-2'), z.literal('dall-e-3'), z.string().nullable()]).optional(),

  n: z.number().nullable().optional().refine(
    (value) => value === null || (value !== undefined && value >= 1 && value <= 10),
    { message: 'n must be between 1 and 10. For dall-e-3, only n=1 is supported.' }
  ),

  quality: z.enum(['standard', 'hd']).optional(),

  response_format: z.enum(['url', 'b64_json']).optional().nullable(),

  size: z
    .enum(['256x256', '512x512', '1024x1024', '1792x1024', '1024x1792'])
    .optional()
    .nullable(),

  style: z.enum(['vivid', 'natural']).optional().nullable(),

  user: z.string().optional(),
});
