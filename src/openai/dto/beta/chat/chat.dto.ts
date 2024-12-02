import { z } from "zod";
import { RequestOptionsSchema } from "../../openai/RequestOptions/schema/RequestOptionsSchema";
import { ChatCompletionParseParams$inboundSchema } from "./schema/parseChatCompletionSchema";
import { createZodDto } from "nestjs-zod";
import { ChatCompletionStreamingToolRunnerParams$inboundSchema, ChatCompletionToolRunnerParams$inboundSchema } from "./schema/RunToolsSchema";
import { RunnerOptionsSchema } from "./schema/RunToolsSchema/RunnerOptionsSchema";

export const ParseChatCompletionSchema = z.object({
    body: ChatCompletionParseParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
});

export const RunToolsSchema = z.object({
    body: z.union([
      ChatCompletionToolRunnerParams$inboundSchema,
      ChatCompletionStreamingToolRunnerParams$inboundSchema,
    ]),
    options: RunnerOptionsSchema.optional(),
});


export class ParseChatCompletionDto extends createZodDto(ParseChatCompletionSchema) {}
export class RunToolsDto extends createZodDto(RunToolsSchema) {}