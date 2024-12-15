import { z } from "zod";
import { BaseParamsSchema } from "./BaseParamsSchema";
import { ContentSchema } from "./ContentSchema";
import { ToolConfigSchema } from "./ToolConfigSchema";
import { PartSchema } from "./PartSchema";
import { GenerateContentRequest } from "@google/generative-ai";

export const GenerateContentRequest$Schema = BaseParamsSchema.extend({
  contents: z.array(ContentSchema),
  tools: z.array(z.any()).optional(), // Replace `z.any()` with the actual schema for `Tool` if available
  toolConfig: ToolConfigSchema.optional(), // Replace `z.any()` with the actual schema for `ToolConfig` if available
  systemInstruction: z.union([z.string(), PartSchema, ContentSchema]).optional(),
  cachedContent: z.string().optional(),
})satisfies z.ZodType<GenerateContentRequest>;

