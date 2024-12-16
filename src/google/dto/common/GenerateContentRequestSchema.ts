import { z } from "zod";
import { BaseParamsSchema } from "./BaseParamsSchema";
import { ContentSchema } from "./ContentSchema";
import { ToolConfigSchema } from "./ToolConfigSchema";
import { PartSchema } from "./PartSchema";
import { GenerateContentRequest } from "@google/generative-ai";
import { ToolSchema } from "./ToolSchema";

export const GenerateContentRequest$Schema = BaseParamsSchema.extend({
  contents: z.array(ContentSchema),
  tools: z.array(ToolSchema).optional(), 
  toolConfig: ToolConfigSchema.optional(), 
  systemInstruction: z.union([z.string(), PartSchema, ContentSchema]).optional(),
  cachedContent: z.string().optional(),
})satisfies z.ZodType<GenerateContentRequest>;

