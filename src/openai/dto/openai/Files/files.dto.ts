
import { z } from "zod";
import { createZodDto } from "nestjs-zod";
import { RequestOptionsSchema } from "../RequestOptions/schema/RequestOptionsSchema";
import { FileCreateParams$inboundSchema } from "./schema/CreateFileSchema";
import { FileListParamsSchema } from "./schema/ListFilesSchema";
import { WaitForProcessingOptionsSchema } from "./schema/WaitForProcessingSchema";

const CreateFileSchema = z.object({
    body: FileCreateParams$inboundSchema,
    options: RequestOptionsSchema().optional(), // Make `options` optional
});

export const ListFilesSchema = z.object({
    query: FileListParamsSchema.optional(),  // Optional query field to include file listing parameters
    options: RequestOptionsSchema().optional(),  // Include the RequestOptionsSchema for options
});
  
export class CreateFileDto extends createZodDto(CreateFileSchema) {}

export class ListFilesDto  extends createZodDto(ListFilesSchema) {}

export class WaitForProcessingDto  extends createZodDto(WaitForProcessingOptionsSchema) {}
