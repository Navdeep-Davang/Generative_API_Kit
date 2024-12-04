import { RequestOptionsSchema } from "@/openai/dto/openai/RequestOptions/schema/RequestOptionsSchema";
import { z } from "zod";

// Extend RequestOptionsSchema to include pollIntervalMs
export const ExtendedRequestOptionsSchema = RequestOptionsSchema().extend({
  pollIntervalMs: z.number().optional(),
});