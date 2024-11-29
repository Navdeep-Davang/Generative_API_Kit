import { z } from "zod";
import { RequestOptionsSchema } from '../RequestOptions/schema/RequestOptionsSchema';
import {
  CompletionCreateParams$inboundSchema,
  CompletionCreateParamsBase$inboundSchema,
  CompletionCreateParamsNonStreaming$inboundSchema,
  CompletionCreateParamsStreaming$inboundSchema,
} from './schema/CompletionsSchema';
import { createZodDto } from 'nestjs-zod';
import { CompletionCreateParamsNonStreaming, CompletionCreateParamsStreaming } from "openai/resources";

// Custom refinement to narrow the body based on the stream field
const narrowedBodySchema = z
  .union([
    CompletionCreateParamsNonStreaming$inboundSchema,
    CompletionCreateParamsStreaming$inboundSchema,
    CompletionCreateParamsBase$inboundSchema,
  ])
  .refine((data) => {
    // Check for stream presence and ensure `stream` matches the SDK expectations
    if (data.stream === true) {
      return !!(data as CompletionCreateParamsStreaming).stream; // Ensures stream is true for streaming
    }
    if (data.stream === false || data.stream === null) {
      return !!(data as CompletionCreateParamsNonStreaming).stream; // Ensures stream is false or null for non-streaming
    }
    return true; // If stream is undefined or other, allow it
  }, {
    message: "Stream must be either true (for streaming) or false/null (for non-streaming)",
  })
  .refine((data) => {
    // Ensure that when `stream` is false or null, we still have a valid base object (prompt is defined)
    if (data.stream === null || data.stream === false) {
      return data.model && data.prompt !== undefined;
    }
    return true;
  }, {
    message: "When stream is false or null, model and prompt must be provided",
  })
  .refine((data) => {
    // Ensure that when stream is true, we have prompt defined
    if (data.stream === true) {
      return data.prompt !== undefined;
    }
    return true;
  }, {
    message: "When stream is true, prompt must be defined",
  });

// Main schema to check the body and options
export const CreateCompletionSchema = z.object({
  body: narrowedBodySchema,
  options: RequestOptionsSchema().optional(),
});

export class CreateCompletionDto extends createZodDto(CreateCompletionSchema) {}
