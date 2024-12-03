import { z } from "zod";
import { RequestOptionsSchema } from "../../openai/RequestOptions/schema/RequestOptionsSchema";
import { ThreadCreateParams$inboundSchema } from "./schema/threads/ThreadCreateParamsSchema";
import { createZodDto } from "nestjs-zod";
import { ThreadUpdateParams$inboundSchema } from "./schema/threads/ThreadUpdateSchema";
import { ThreadCreateAndRunParamsNonStreaming$inboundSchema, ThreadCreateAndRunParamsStreaming$inboundSchema } from "./schema/threads/ThreadCreateAndRunSchema";

export const ThreadCreateSchema = z.object({
    body: ThreadCreateParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
});

export const ThreadUpdateSchema = z.object({
    body: ThreadUpdateParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
});

export const ThreadCreateAndRunSchema = z.object({
    body: z.union([
      ThreadCreateAndRunParamsNonStreaming$inboundSchema, // Union with ThreadCreateAndRunParamsNonStreaming schema
      ThreadCreateAndRunParamsStreaming$inboundSchema,    // Union with ThreadCreateAndRunParamsStreaming schema
    ]),
    options: RequestOptionsSchema().optional(), // options is optional and follows the RequestOptions schema
});



export class ThreadCreateDto extends createZodDto(ThreadCreateSchema) {}
export class ThreadUpdateDto extends createZodDto(ThreadUpdateSchema) {}
export class ThreadCreateAndRunDto extends createZodDto(ThreadCreateAndRunSchema) {}
