import { z } from "zod";
import { UploadCreateParams$inboundSchema } from "./schema/CreateUploadSchema";
import { RequestOptionsSchema } from "../RequestOptions/schema/RequestOptionsSchema";
import { createZodDto } from "nestjs-zod";
import { UploadCompleteParams$inboundSchema } from "./schema/CompleteUploadSchema";
import { PartCreateParams$inboundSchema } from "./schema/CreatePartSchema";

export const CreateUploadSchema = z.object({
    body: UploadCreateParams$inboundSchema, // Main upload creation params
    options: RequestOptionsSchema().optional(), // Optional request options
});

export const CompleteUploadSchema = z.object({
    body: UploadCompleteParams$inboundSchema, // Upload completion parameters
    options: RequestOptionsSchema().optional(), // Optional request options
})

export const CreatePartSchema = z.object({
    body: PartCreateParams$inboundSchema,    // Part creation parameters
    options: RequestOptionsSchema().optional(), // Optional request options
});

export class CreateUploadDto extends createZodDto(CreateUploadSchema) {}
export class CompleteUploadDto extends createZodDto(CompleteUploadSchema) {}
export class CreatePartDto extends createZodDto(CreatePartSchema) {}
