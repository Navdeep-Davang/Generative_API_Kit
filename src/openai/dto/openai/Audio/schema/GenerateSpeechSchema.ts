
import { z } from 'zod';

export const SpeechCreateParams$inboundSchema = z.object({
  input: z.string().max(4096),
  model: z.literal('tts-1').or(z.literal('tts-1-hd')),
  voice: z.enum(['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer']),
  response_format: z.enum(['mp3', 'opus', 'aac', 'flac', 'wav', 'pcm']).optional(),
  speed: z.number().min(0.25).max(4.0).optional(),
});
