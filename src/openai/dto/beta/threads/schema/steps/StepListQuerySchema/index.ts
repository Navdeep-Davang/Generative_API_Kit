import { z } from 'zod';

// Directly using the RunStepIncludeSchema as a literal value
export const StepListParams$inboundSchema = z.object({
  // `before` is an optional string
  before: z.string().optional(),

  // `include` is an optional array of RunStepInclude values
  include: z.array(z.literal('step_details.tool_calls[*].file_search.results[*].content')).optional(),

  // `order` is an optional field that must be either 'asc' or 'desc'
  order: z.enum(['asc', 'desc']).optional(),

  // CursorPageParams fields
  after: z.string().optional(),
  limit: z.number().int().optional(),
});
