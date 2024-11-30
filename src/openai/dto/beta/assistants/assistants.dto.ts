import { z } from "zod";
import { AssistantCreateParams$inboundSchema } from "./schema/AssistantCreateSchema";
import { RequestOptionsSchema } from "../../openai/RequestOptions/schema/RequestOptionsSchema";
import { createZodDto } from "nestjs-zod";
import { AssistantUpdateParams$inboundSchema } from "./schema/AssistantUpdateSchema";
import { AssistantListParams$inboundSchema } from "./schema/AssistantListSchema";

export const AssistantCreateSchema = z.object({
    body: AssistantCreateParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
});

export const AssistantUpdateSchema = z.object({
    body: AssistantUpdateParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
});

export const AssistantListSchema = z.object({
    query: AssistantListParams$inboundSchema.optional(),
    options: RequestOptionsSchema().optional(), // Assuming RequestOptionsSchema is already defined elsewhere
});

export class AssistantCreateDto extends createZodDto(AssistantCreateSchema) {}
export class AssistantUpdateDto extends createZodDto(AssistantUpdateSchema) {}
export class AssistantListDto extends createZodDto(AssistantListSchema) {}