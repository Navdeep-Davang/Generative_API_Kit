import { createZodDto } from "nestjs-zod";
import { StartChatParams$Schema } from "./schema/StartChatParamsSchema";
import { z } from "zod";
import { RequestOptionsSchema } from "../RequestOptions/schema/RequestOptionsSchema";
import { ModelParamsSchema } from "../common/ModelParamsSchema";

export const StartChatSchema = z.object({
    modelParams: ModelParamsSchema, 
    requestOptions: RequestOptionsSchema.optional(),
    startChatParams: StartChatParams$Schema.optional(), // Optional property
  });

export class StartChatDto extends createZodDto(StartChatSchema) {}