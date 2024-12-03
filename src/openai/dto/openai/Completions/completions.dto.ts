import { z } from "zod";
import { RequestOptionsSchema } from '../RequestOptions/schema/RequestOptionsSchema';
import {
  CompletionCreateParamsNonStreaming$inboundSchema,
  CompletionCreateParamsStreaming$inboundSchema,
} from './schema/CompletionsSchema';
import { createZodDto } from 'nestjs-zod';

// Define the schema with the narrowing logic
export const CreateCompletionSchema = z.object({
  body: z.union([
    // Non-streaming schema refinement
    CompletionCreateParamsNonStreaming$inboundSchema.refine((data) => {
      // Ensure `stream` is false or null and prompt is defined for non-streaming
      if (data.stream === false || data.stream === null) {
        return data.prompt !== undefined;
      }
      return true;
    }, {
      message: "When stream is false or null, prompt must be defined",
    }).transform((data) => {
      // Set `stream` to false/null if not streaming
      return {
        ...data,
        stream: data.stream === null || data.stream === false ? false : null,
        prompt: data.prompt || [], // Default prompt to empty array if undefined
      };
    }),

    // Streaming schema refinement
    CompletionCreateParamsStreaming$inboundSchema.refine((data) => {
      // Ensure `prompt` is defined for streaming
      if (data.stream === true) {
        return data.prompt !== undefined;
      }
      return true;
    }, {
      message: "When stream is true, prompt must be defined",
    }).transform((data) => {
      // Set `stream` to true for streaming
      return {
        ...data,
        stream: true,
        prompt: data.prompt || [], // Default prompt to empty array if undefined
      };
    })
  ]),

  options: RequestOptionsSchema().optional(),
});

export class CreateCompletionDto extends createZodDto(CreateCompletionSchema) {}
