import { z } from "zod";

export const StepRetrieveParams$inboundSchema = z.object({
    include: z.array(z.literal('step_details.tool_calls[*].file_search.results[*].content')).optional(),
  });