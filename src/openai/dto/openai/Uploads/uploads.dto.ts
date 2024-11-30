import { z } from "zod";
import { UploadCreateParams$inboundSchema } from "./schema/CreateUploadSchema";
import { RequestOptionsSchema } from "../RequestOptions/schema/RequestOptionsSchema";
import { createZodDto } from "nestjs-zod";

export const CreateUploadSchema = z.object({
    body: UploadCreateParams$inboundSchema, // Main upload creation params
    options: RequestOptionsSchema().optional(), // Optional request options
});
  
export class CreateUploadDto extends createZodDto(CreateUploadSchema) {}