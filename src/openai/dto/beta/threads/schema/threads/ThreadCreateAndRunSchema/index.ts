import { z } from "zod";
import { ThreadCreateAndRunParamsBaseSchema } from "../common/ThreadCreateAndRunParamsBaseSchema";

export const ThreadCreateAndRunParamsNonStreaming$inboundSchema = ThreadCreateAndRunParamsBaseSchema.extend({
    stream: z.union([z.literal(false), z.null()]).optional(),
});

export const ThreadCreateAndRunParamsStreaming$inboundSchema = ThreadCreateAndRunParamsBaseSchema.extend({
    stream: z.literal(true), // Ensures stream is always true
});
