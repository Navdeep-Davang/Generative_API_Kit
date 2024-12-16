import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { EmbedContentRequest$Schema } from "./schema/common/EmbedContentRequestSchema";
import { PartSchema } from "../common/PartSchema";
import { SingleRequestOptionsSchema } from "../SingleRequestOptions/schema/SingleRequestOptionsSchema";
import { RequestOptionsSchema } from "../RequestOptions/schema/RequestOptionsSchema";
import { ModelParamsSchema } from "../common/ModelParamsSchema";

export const EmbedContentSchema = z.object({
    modelParams: ModelParamsSchema, 
    requestOptions: RequestOptionsSchema.optional(),
    request: z.union([
      EmbedContentRequest$Schema,
      z.string(),
      z.array(z.union([z.string(), PartSchema])),
    ]),
    singleRequestOptions: SingleRequestOptionsSchema.optional(),
});

  export class EmbedContentDto extends createZodDto(EmbedContentSchema) {}