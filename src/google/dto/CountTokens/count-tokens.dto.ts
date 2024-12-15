import { createZodDto } from "nestjs-zod";
import { z } from "zod";

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