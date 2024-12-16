import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { BatchEmbedContentsRequest$Schema } from "./schema/BatchEmbedContentsRequestSchema";
import { SingleRequestOptionsSchema } from "../SingleRequestOptions/schema/SingleRequestOptionsSchema";
import { ModelParamsSchema } from "../common/ModelParamsSchema";
import { RequestOptionsSchema } from "../RequestOptions/schema/RequestOptionsSchema";

// Define BatchEmbedContentsSchema
export const BatchEmbedContentsSchema = z.object({
    modelParams: ModelParamsSchema, // Schema for model parameters
    requestOptions: RequestOptionsSchema.optional(),
    batchEmbedContentRequest: BatchEmbedContentsRequest$Schema,
    singleRequestOptions: SingleRequestOptionsSchema.optional(),
  });
  
  // Create BatchEmbedContentsDto
export class BatchEmbedContentsDto extends createZodDto(BatchEmbedContentsSchema) {}