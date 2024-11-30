import { z } from "zod";
import { ModerationCreateParams$inboundSchema } from "./schema/CreateModerationSchema";
import { RequestOptionsSchema } from "../RequestOptions/schema/RequestOptionsSchema";
import { createZodDto } from "nestjs-zod";

export const CreateModerationSchema = z.object({
    body: ModerationCreateParams$inboundSchema, 
    options: RequestOptionsSchema().optional(), 
});

export class CreateModerationDto extends createZodDto(CreateModerationSchema) {}