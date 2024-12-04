import { z } from "zod";


// RunUpdateParamsSchema based on the RunUpdateParams interface
export const RunUpdateParams$inboundSchema = z.object({
  metadata: z.unknown().nullable().optional(),
});


