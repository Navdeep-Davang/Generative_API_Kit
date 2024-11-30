
import { z } from 'zod';
import { UploadableSchema } from '../../Files/schema/CreateFileSchema';

export const TranslationCreateParams$inboundSchema = z.object({
  file: UploadableSchema,
  model: z.literal('whisper-1'),
  prompt: z.string().optional(),
  response_format: z.enum(['json', 'text', 'srt', 'verbose_json', 'vtt']).optional(),
  temperature: z.number().min(0).max(1).optional(),
});
