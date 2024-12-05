import { RequestOptionsSchema } from "@/openai/dto/openai/RequestOptions/schema/RequestOptionsSchema";
import { z } from "zod";

export const FileBatchRequestOptionsSchema = RequestOptionsSchema().extend({
    pollIntervalMs: z.number().int().optional(),  // Optional integer for polling interval
    maxConcurrency: z.number().int().optional(),  // Optional integer for max concurrency
  });