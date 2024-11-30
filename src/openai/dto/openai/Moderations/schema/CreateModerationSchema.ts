import { z } from 'zod';


const ModerationMultiModalInputSchema = z.union([
  z.object({
    image_url: z.object({
      url: z.string().url(), 
    }),
    type: z.literal('image_url'),
  }),
  z.object({
    text: z.string(), 
    type: z.literal('text'), 
  }),
]);


export const ModerationCreateParams$inboundSchema = z.object({
  input: z.union([
    z.string(), 
    z.array(z.string()), 
    z.array(ModerationMultiModalInputSchema), 
  ]),
  model: z.union([z.string(), z.literal('moderation-1'), z.literal('moderation-2')]).optional(),
});
