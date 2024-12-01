import { z } from "zod";
import { RequestOptionsSchema } from "../../openai/RequestOptions/schema/RequestOptionsSchema";
import { ChatCompletionParseParams$inboundSchema } from "./schema/parseChatCompletionSchema";
import { createZodDto } from "nestjs-zod";

export const ParseChatCompletionSchema = z.object({
    body: ChatCompletionParseParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
});

export class ParseChatCompletionDto extends createZodDto(ParseChatCompletionSchema) {}