import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { EmbeddingCreateParams$inboundSchema } from "./schema/EmbeddingsSchema";
import { RequestOptionsSchema } from "../RequestOptions/schema/RequestOptionsSchema";

const CreateEmbeddingSchema = z.object({
    body: EmbeddingCreateParams$inboundSchema,
    options: RequestOptionsSchema().optional(), // Make `options` optional
  });

export class CreateEmbeddingDto extends createZodDto(CreateEmbeddingSchema) {}