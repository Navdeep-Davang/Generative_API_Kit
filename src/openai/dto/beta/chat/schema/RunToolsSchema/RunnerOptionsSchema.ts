import { z } from "zod";
import { RequestOptionsSchema } from "@/openai/dto/openai/RequestOptions/schema/RequestOptionsSchema";


export const RunnerOptionsSchema = RequestOptionsSchema().extend({
    maxChatCompletions: z.number().optional().default(10), // Optional with a default value
});