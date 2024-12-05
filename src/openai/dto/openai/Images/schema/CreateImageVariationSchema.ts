import { UploadableSchema } from '@/openai/dto/common/UploadableSchema';
import { z } from 'zod';


export const ImageCreateVariationParams$inboundSchema = z.object({
  image: UploadableSchema,
  model: z.union([z.literal('dall-e-2'), z.literal('dall-e-3'), z.string().nullable()]).optional(),
  n: z.number()
    .optional()
    .refine(value => value === undefined || value === null || (value >= 1 && value <= 10), {
      message: "n must be between 1 and 10, and for dall-e-3, n must be 1."
    }),
  response_format: z.enum(['url', 'b64_json']).optional(),
  size: z.enum(['256x256', '512x512', '1024x1024']).optional(),
  user: z.string().optional(),
});
