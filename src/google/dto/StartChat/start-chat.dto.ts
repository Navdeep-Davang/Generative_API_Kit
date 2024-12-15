import { createZodDto } from "nestjs-zod";
import { StartChatParams$Schema } from "./schema/StartChatParamsSchema";
import { z } from "zod";

export const StartChatSchema = z.object({
    startChatParams: StartChatParams$Schema.optional(), // Optional property
  });

export class StartChatDto extends createZodDto(StartChatSchema) {}