import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { EmbedContentRequest$Schema } from "./schema/common/EmbedContentRequestSchema";
import { PartSchema } from "../common/PartSchema";
import { SingleRequestOptionsSchema } from "../SingleRequestOptions/schema/SingleRequestOptionsSchema";

export const EmbedContentSchema = z.object({
    request: z.union([
      EmbedContentRequest$Schema,
      z.string(),
      z.array(z.union([z.string(), PartSchema])),
    ]),
    requestOptions: SingleRequestOptionsSchema.optional(),
});

  export class EmbedContentDto extends createZodDto(EmbedContentSchema) {}