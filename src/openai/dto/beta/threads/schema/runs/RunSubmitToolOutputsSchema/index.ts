import { RequestOptionsSchema } from "@/openai/dto/openai/RequestOptions/schema/RequestOptionsSchema";
import { z } from "zod";
import { RunSubmitToolOutputsParamsBaseSchema } from "../common/RunSubmitToolOutputsParamsBaseSchema";


// Non-streaming schema: stream can be false, null, or omitted
export const RunSubmitToolOutputsParamsNonStreaming$inboundSchema = RunSubmitToolOutputsParamsBaseSchema.extend({
    stream: z.union([z.literal(false), z.null()]).optional(),
});
  
  // Streaming schema: stream must be true
export const RunSubmitToolOutputsParamsStreaming$inboundSchema = RunSubmitToolOutputsParamsBaseSchema.extend({
    stream: z.literal(true),
});


