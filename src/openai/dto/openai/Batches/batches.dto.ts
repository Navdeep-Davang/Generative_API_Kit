import { z } from "zod";
import { BatchCreateParams$inboundSchema } from "./schema/CreateBatchSchema";
import { RequestOptionsSchema } from "../RequestOptions/schema/RequestOptionsSchema";
import { createZodDto } from "nestjs-zod";
import { CursorPageParamsSchema } from "../FineTuning/finetuning.dto";

export const CreateBatchSchema = z.object({
    body: BatchCreateParams$inboundSchema, // Main Batch creation params
    options: RequestOptionsSchema().optional(), // Optional request options
  });

  export class CreateBatchDto extends createZodDto(CreateBatchSchema) {}
  export class ListBatchDto extends createZodDto(CursorPageParamsSchema) {}