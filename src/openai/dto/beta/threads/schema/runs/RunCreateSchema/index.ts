import { z } from "zod";
import { RunCreateParamsBaseSchema } from "../common/RunCreateParamsBaseSchema";

export const RunCreateParamsNonStreaming$inboundSchema = RunCreateParamsBaseSchema.extend({
    stream: z.union([z.literal(false), z.null()]).optional(),
  });
  
  // Schema for RunCreateParamsStreaming
  export const RunCreateParamsStreaming$inboundSchema = RunCreateParamsBaseSchema.extend({
    stream: z.literal(true),
  });