import { z } from "zod";
import { RunCreateParamsBaseSchema } from "../common/RunCreateParamsBaseSchema";

export const RunCreateParamsBaseStream$inboundSchema = z.object({
    ...RunCreateParamsBaseSchema.shape, // Spread the shape of the base schema
    stream: z.literal(true).optional(), // Redefine the 'stream' property
  });