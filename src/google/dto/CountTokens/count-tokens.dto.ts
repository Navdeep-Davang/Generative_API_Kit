import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { CountTokensRequest$Schema } from "./schema/CountTokensSchema";
import { PartSchema } from "../BatchEmbedContents/schema/common/PartSchema";
import { SingleRequestOptionsSchema } from "../SingleRequestOptions/schema/SingleRequestOptionsSchema";

// Define the CountTokensSchema
export const CountTokensSchema = z.object({
    request: z.union([
      CountTokensRequest$Schema,
      z.string(),
      z.array(z.union([z.string(), PartSchema])),
    ]),
    requestOptions: SingleRequestOptionsSchema.optional(),
  });
  
  // Create the DTO
  export class CountTokensDto extends createZodDto(CountTokensSchema) {}