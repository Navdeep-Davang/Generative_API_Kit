import { z } from "zod";

export const CursorPageParams$inboundSchema = z.object({
    after: z.string().optional(), // Cursor for pagination
    limit: z.number().int().optional(), // Limit on the number of results
  });