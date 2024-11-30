import { z } from "zod";
import { RequestOptionsSchema } from "../RequestOptions/schema/RequestOptionsSchema";
import { JobCreateParams$inboundSchema } from "./schema/CreateFineTuningJobDtoCreateFineTuningJobSchema";
import { createZodDto } from "nestjs-zod";
import { CursorPageParams$inboundSchema } from "./schema/CursorPageParamsSchema";

export const CreateFineTuningJobSchema = z.object({
    body: JobCreateParams$inboundSchema, 
    options: RequestOptionsSchema().optional(), 
});

export const CursorPageParamsSchema = z.object({
    query: CursorPageParams$inboundSchema.optional(), // Optional query object
    options: RequestOptionsSchema().optional(), // Optional request options
});

export class CreateFineTuningJobDto extends createZodDto(CreateFineTuningJobSchema) {}
export class ListFineTuningJobsDto extends createZodDto(CursorPageParamsSchema) {}
export class ListFineTuningJobEventsDto extends createZodDto(CursorPageParamsSchema) {}
export class ListFineTuningJobCheckpointsDto extends createZodDto(CursorPageParamsSchema) {}