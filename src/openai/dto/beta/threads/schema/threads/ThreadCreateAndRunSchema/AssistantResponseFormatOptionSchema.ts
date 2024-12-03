import { z } from "zod";

// AssistantResponseFormatOption Schema
export const AssistantResponseFormatOptionSchema = z.union([
    z.literal('auto'),
    z.object({ type: z.literal('text') }),
    z.object({ type: z.literal('json_object') }),
    z.object({
      type: z.literal('json_schema'),
      json_schema: z.object({
        name: z.string().max(64),
        description: z.string().optional(),
        schema: z.record(z.string(), z.any()).optional(),
        strict: z.boolean().nullable().optional(),
      }),
    }),
  ]);