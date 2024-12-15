import { z } from "zod";
import { ContentSchema } from "../../common/ContentSchema";
import { CountTokensRequest} from "@google/generative-ai";
import { GenerateContentRequest$Schema } from "../../common/GenerateContentRequestSchema";



export const CountTokensRequest$Schema = z.object({
    generateContentRequest: GenerateContentRequest$Schema.optional(),
    contents: z.array(ContentSchema).optional(),
  }) satisfies z.ZodType<CountTokensRequest>;