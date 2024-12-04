import { RunSubmitToolOutputsParamsBase } from "openai/resources/beta/threads/runs/runs";
import { z } from "zod";

export const RunSubmitToolOutputsParamsBaseSchema = z.object({
  // Define tool_outputs as an array of objects with optional output and tool_call_id
  tool_outputs: z.array(
    z.object({
      output: z.string().optional(),
      tool_call_id: z.string().optional(),
    })
  ),

  // Define stream as an optional boolean or null
  stream: z.boolean().nullable().optional(),
}) satisfies z.ZodType<RunSubmitToolOutputsParamsBase>;
