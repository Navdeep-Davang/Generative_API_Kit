import { z } from "zod";
import { PartSchema } from "../common/PartSchema";
import { GenerateContentRequest$Schema } from "../common/GenerateContentRequestSchema";
import { SingleRequestOptionsSchema } from "../SingleRequestOptions/schema/SingleRequestOptionsSchema";
import { createZodDto } from "nestjs-zod";
import { RequestOptionsSchema } from "../RequestOptions/schema/RequestOptionsSchema";
import { ModelParamsSchema } from "../common/ModelParamsSchema";


export const GenerateContentSchema = z.object({
    modelParams: ModelParamsSchema, // Schema for model parameters
    requestOptions: RequestOptionsSchema.optional(),
    request: z.union([
      GenerateContentRequest$Schema, 
      z.string(), 
      z.array(z.union([z.string(), PartSchema])), 
    ]),
    singleRequestOptions: SingleRequestOptionsSchema.optional(),

});


export class GenerateContentDto extends createZodDto(GenerateContentSchema) {}
