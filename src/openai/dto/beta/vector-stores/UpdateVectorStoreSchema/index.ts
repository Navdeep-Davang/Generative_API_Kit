import { z } from 'zod';

export const VectorStoreUpdateParams$inboundSchema = z.object({
  expires_after: z
    .object({
      anchor: z.literal('last_active_at'),
      days: z.number().int(),
    })
    .optional()
    .nullable(),

  metadata: z.unknown().optional().nullable(),

  name: z.string().optional().nullable(),
});
