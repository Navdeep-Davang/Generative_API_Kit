import { z } from "zod";
import { ThreadCreateAndRunParamsBaseSchema } from "./ThreadCreateAndRunParamsBaseSchema";

export const ThreadCreateAndRunParamsNonStreaming$inboundSchema = ThreadCreateAndRunParamsBaseSchema.extend({
    stream: z.boolean().nullable().optional(),
});

export const ThreadCreateAndRunParamsStreaming$inboundSchema = ThreadCreateAndRunParamsBaseSchema.extend({
    stream: z.literal(true), // Ensures stream is always true
});
