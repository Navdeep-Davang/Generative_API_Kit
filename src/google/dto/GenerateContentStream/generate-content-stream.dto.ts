import { z } from "zod";
import { PartSchema } from "../common/PartSchema";
import { GenerateContentRequest$Schema } from "../common/GenerateContentRequestSchema";
import { SingleRequestOptionsSchema } from "../SingleRequestOptions/schema/SingleRequestOptionsSchema";
import { createZodDto } from "nestjs-zod";


export const GenerateContentStreamSchema = z.object({
    request: z.union([
      GenerateContentRequest$Schema, 
      z.string(), 
      z.array(z.union([z.string(), PartSchema])), 
    ]),
    requestOptions: SingleRequestOptionsSchema.optional(), 
});


export class GenerateContentStreamDto extends createZodDto(GenerateContentStreamSchema) {}
