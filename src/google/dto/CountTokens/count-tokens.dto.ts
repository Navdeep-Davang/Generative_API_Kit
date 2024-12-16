import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { CountTokensRequest$Schema } from "./schema/CountTokensSchema";
import { PartSchema } from "../common/PartSchema";
import { SingleRequestOptionsSchema } from "../SingleRequestOptions/schema/SingleRequestOptionsSchema";
import { RequestOptionsSchema } from "../RequestOptions/schema/RequestOptionsSchema";
import { ModelParamsSchema } from "../common/ModelParamsSchema";

// Define the CountTokensSchema
export const CountTokensSchema = z.object({
    modelParams: ModelParamsSchema, 
    requestOptions: RequestOptionsSchema.optional(),
    request: z.union([
      CountTokensRequest$Schema,
      z.string(),
      z.array(z.union([z.string(), PartSchema])),
    ]),
    singleRequestOptions: SingleRequestOptionsSchema.optional(),
  });
  
  // Create the DTO
export class CountTokensDto extends createZodDto(CountTokensSchema) {}