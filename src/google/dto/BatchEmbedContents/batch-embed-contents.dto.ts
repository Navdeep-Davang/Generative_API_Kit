import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { BatchEmbedContentsRequest$Schema } from "./schema/BatchEmbedContentsRequestSchema";
import { SingleRequestOptionsSchema } from "../SingleRequestOptions/schema/SingleRequestOptionsSchema";

// Define BatchEmbedContentsSchema
export const BatchEmbedContentsSchema = z.object({
    batchEmbedContentRequest: BatchEmbedContentsRequest$Schema,
    requestOptions: SingleRequestOptionsSchema.optional(),
  });
  
  // Create BatchEmbedContentsDto
export class BatchEmbedContentsDto extends createZodDto(BatchEmbedContentsSchema) {}