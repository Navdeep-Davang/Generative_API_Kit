import { RunListParams } from "openai/resources/beta/threads/runs/runs";
import { z } from "zod";

export const RunListParams$inboundSchema = z.object({
  after: z.string().optional(), // From CursorPageParams
  limit: z.number().optional(), // From CursorPageParams
  before: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
}) satisfies z.ZodType<RunListParams>;
