import { z } from "zod";
import { PartSchema } from "../common/PartSchema";
import { GenerateContentRequest$Schema } from "../common/GenerateContentRequestSchema";
import { SingleRequestOptionsSchema } from "../SingleRequestOptions/schema/SingleRequestOptionsSchema";
import { createZodDto } from "nestjs-zod";
import { ModelParamsSchema } from "../common/ModelParamsSchema";
import { RequestOptionsSchema } from "../RequestOptions/schema/RequestOptionsSchema";


export const GenerateContentStreamSchema = z.object({
    modelParams: ModelParamsSchema, 
    requestOptions: RequestOptionsSchema.optional(),
    request: z.union([
      GenerateContentRequest$Schema, 
      z.string(), 
      z.array(z.union([z.string(), PartSchema])), 
    ]),
    singleRequestOptions: SingleRequestOptionsSchema.optional(), 
});


export class GenerateContentStreamDto extends createZodDto(GenerateContentStreamSchema) {}
