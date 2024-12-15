import { z } from "zod";
import { ContentSchema } from "../../BmbedContent/schema/common/ContentSchema";
import { PartSchema } from "../../BatchEmbedContents/schema/common/PartSchema";
import { CountTokensRequest} from "@google/generative-ai";
import { BaseParamsSchema } from "./common/BaseParamsSchema";


const GenerateContentRequest$Schema = BaseParamsSchema.extend({
    contents: z.array(ContentSchema),
    tools: z.array(z.any()).optional(), // Replace `z.any()` with the actual schema for `Tool` if available
    toolConfig: z.any().optional(), // Replace `z.any()` with the actual schema for `ToolConfig` if available
    systemInstruction: z.union([z.string(), PartSchema, ContentSchema]).optional(),
    cachedContent: z.string().optional(),
  });


export const CountTokensRequest$Schema = z.object({
    generateContentRequest: GenerateContentRequest$Schema.optional(),
    contents: z.array(ContentSchema).optional(),
  }) satisfies z.ZodType<CountTokensRequest>;