import { z } from "zod";
import { RequestOptionsSchema } from "../../openai/RequestOptions/schema/RequestOptionsSchema";
import { ThreadCreateParams$inboundSchema } from "./schema/threads/ThreadCreateParamsSchema";
import { createZodDto } from "nestjs-zod";
import { ThreadUpdateParams$inboundSchema } from "./schema/threads/ThreadUpdateSchema";
import { ThreadCreateAndRunParamsNonStreaming$inboundSchema, ThreadCreateAndRunParamsStreaming$inboundSchema } from "./schema/threads/ThreadCreateAndRunSchema";
import { RunCreateParamsNonStreaming$inboundSchema, RunCreateParamsStreaming$inboundSchema } from "./schema/runs/RunCreateSchema";
import { ExtendedRequestOptionsSchema } from "./schema/runs/common/ExtendedRequestOptionsSchema";
import { RunCreateParamsBaseStream$inboundSchema } from "./schema/runs/RunStreamSchema";
import { RunSubmitToolOutputsParamsNonStreaming$inboundSchema, RunSubmitToolOutputsParamsStreaming$inboundSchema } from "./schema/runs/RunSubmitToolOutputsSchema";
import { RunListParams$inboundSchema } from "./schema/runs/ListRunParamsSchema";
import { RunUpdateParams$inboundSchema } from "./schema/runs/RunUpdateSchema";
import { StepRetrieveParams$inboundSchema } from "./schema/steps/StepRetrieveQuerySchema";
import { StepListParams$inboundSchema } from "./schema/steps/StepListQuerySchema";
import { MessageCreateParams$inboundSchema } from "./schema/messages/MessageCreateSchema";
import { MessageUpdateParams$inboundSchema } from "./schema/messages/MessageUpdateSchema";
import { MessageListParams$inboundSchema } from "./schema/messages/MessageListQuerySchema";


// Threads Services Schema
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

export const ThreadCreateAndRunPollSchema = z.object({
    body: ThreadCreateAndRunParamsNonStreaming$inboundSchema,
    options: ExtendedRequestOptionsSchema.optional(),
});

export const ThreadCreateAndRunStreamSchema = z.object({
    body: ThreadCreateAndRunParamsStreaming$inboundSchema,
    options: RequestOptionsSchema().optional(),
});

// Runs Services Schema
export const RunCreateSchema = z.object({
    params: z.union([
        RunCreateParamsNonStreaming$inboundSchema, // Union with ThreadCreateAndRunParamsNonStreaming schema
        RunCreateParamsStreaming$inboundSchema,    // Union with ThreadCreateAndRunParamsStreaming schema
    ]),
    options: RequestOptionsSchema().optional(), // options is optional and follows the RequestOptions schema
});

export const RunUpdateSchema = z.object({
    body: RunUpdateParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
});
  
export const ListRunParamsSchema = z.object({
    query: RunListParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
});

export const RunCreateAndPollSchema = z.object({
    body: RunCreateParamsNonStreaming$inboundSchema,
    options: ExtendedRequestOptionsSchema.optional(),
});

export const RunStreamSchema = z.object({
    body: RunCreateParamsBaseStream$inboundSchema,
    options: RequestOptionsSchema().optional(),
});

export const RunSubmitToolOutputsSchema = z.object({
    body: z.union([
      RunSubmitToolOutputsParamsNonStreaming$inboundSchema,
      RunSubmitToolOutputsParamsStreaming$inboundSchema,
    ]),
    options: RequestOptionsSchema().optional(),
});

export const RunSubmitToolOutputsPollSchema = z.object({
    body: RunSubmitToolOutputsParamsNonStreaming$inboundSchema,
    options: ExtendedRequestOptionsSchema.optional(),
});

export const RunSubmitToolOutputsStreamSchema = z.object({
    body: RunSubmitToolOutputsParamsStreaming$inboundSchema,
    options: RequestOptionsSchema().optional(),
});

//Steps Service Schema
export const StepRetrieveQuerySchema = z.object({
    query: StepRetrieveParams$inboundSchema, // Use the previously defined schema for `query`
    options: RequestOptionsSchema().optional(), // The `options` field is optional, based on the RequestOptions schema
});

export const StepListQuerySchema = z.object({
    query: StepListParams$inboundSchema, // Use the previously defined schema for `query`
    options: RequestOptionsSchema().optional(), // The `options` field is optional, based on the RequestOptions schema
});

//Messages Service Schema
export const MessageCreateSchema = z.object({
    body: MessageCreateParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
  });

export const MessageUpdateSchema = z.object({
    body: MessageUpdateParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
});

export const MessageListQuerySchema = z.object({
    query: MessageListParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
});








// Threads DTO
export class ThreadCreateDto extends createZodDto(ThreadCreateSchema) {}
export class ThreadUpdateDto extends createZodDto(ThreadUpdateSchema) {}
export class ThreadCreateAndRunDto extends createZodDto(ThreadCreateAndRunSchema) {}
export class ThreadCreateAndRunPollDto extends createZodDto(ThreadCreateAndRunPollSchema) {}
export class ThreadCreateAndRunStreamDto extends createZodDto(ThreadCreateAndRunStreamSchema) {}

// Runs DTO
export class RunCreateDto extends createZodDto(RunCreateSchema) {}
export class RunUpdateDto extends createZodDto(RunUpdateSchema) {}
export class ListRunParamsDto extends createZodDto(ListRunParamsSchema) {}
export class RunCreateAndPollDto extends createZodDto(RunCreateAndPollSchema) {}
export class RunStreamDto extends createZodDto(RunStreamSchema) {}
export class RunSubmitToolOutputsDto extends createZodDto(RunSubmitToolOutputsSchema) {}
export class RunSubmitToolOutputsPollDto extends createZodDto(RunSubmitToolOutputsPollSchema) {}
export class RunSubmitToolOutputsStreamDto extends createZodDto(RunSubmitToolOutputsStreamSchema) {}

//Steps DTO
export class StepRetrieveQueryDto extends createZodDto(StepRetrieveQuerySchema) {}
export class StepListQueryDto extends createZodDto(StepListQuerySchema) {}

//Messages DTO
export class MessageCreateDto extends createZodDto(MessageCreateSchema) {}
export class MessageUpdateDto extends createZodDto(MessageUpdateSchema) {}
export class MessageListQueryDto extends createZodDto(MessageListQuerySchema) {}


export class ExtendedRequestOptionsDto extends createZodDto(ExtendedRequestOptionsSchema) {}

