import { z } from "zod";
import { BaseParamsSchema } from "../../common/BaseParamsSchema";
import { ContentSchema } from "../../common/ContentSchema";
import { PartSchema } from "../../common/PartSchema";
import { StartChatParams } from "@google/generative-ai";
import { ToolConfigSchema } from "../../common/ToolConfigSchema";
import { ToolSchema } from "../../common/ToolSchema";


//All Schemma

export const StartChatParams$Schema = BaseParamsSchema.extend({
    history: z.array(ContentSchema).optional(),
    tools: z.array(ToolSchema).optional(),
    toolConfig: ToolConfigSchema.optional(),
    systemInstruction: z.union([z.string(), PartSchema, ContentSchema]).optional(), // Replace z.object({}) with PartSchema if defined
    cachedContent: z.string().optional(),
  }) satisfies z.ZodType<StartChatParams>;