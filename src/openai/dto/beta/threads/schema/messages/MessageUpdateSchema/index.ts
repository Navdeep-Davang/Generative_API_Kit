import { z } from "zod";

export const MessageUpdateParams$inboundSchema = z.object({
    // `metadata` is optional and can be any valid object or null
    metadata: z.unknown().optional().nullable(),
  });