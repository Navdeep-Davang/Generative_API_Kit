import { z } from 'zod';
import { UploadableSchema } from '../../Files/schema/CreateFileSchema';

export const TranscriptionCreateParams$inboundSchema = z.object({
  file: UploadableSchema,
  model: z.union([z.literal('whisper-1'), z.string()]),

  language: z.string().optional(),

  prompt: z.string().optional(),

  response_format: z
    .enum(['json', 'text', 'srt', 'verbose_json', 'vtt'])
    .optional(),

  temperature: z
    .number()
    .min(0, { message: 'Temperature must be at least 0.' })
    .max(1, { message: 'Temperature must not exceed 1.' })
    .optional(),

  timestamp_granularities: z.array(z.enum(['word', 'segment'])).optional(),
});
