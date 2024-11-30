import { z } from "zod";

export const AssistantListParams$inboundSchema = z.object({
    before: z.string().optional(),
    order: z.enum(['asc', 'desc']).optional(),
    after: z.string().optional(),
    limit: z.number().optional(),
  });