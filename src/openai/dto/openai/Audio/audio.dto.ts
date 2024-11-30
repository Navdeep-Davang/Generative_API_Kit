import { z } from "zod";
import { TranscriptionCreateParams$inboundSchema } from "./schema/CreateTranscriptionSchema";
import { RequestOptionsSchema } from "../RequestOptions/schema/RequestOptionsSchema";
import { createZodDto } from "nestjs-zod";
import { TranslationCreateParams$inboundSchema } from "./schema/CreateTranslationSchema";
import { SpeechCreateParams$inboundSchema } from "./schema/GenerateSpeechSchema";

export const CreateTranscriptionSchema = z.object({
    body: TranscriptionCreateParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
});

export const CreateTranslationSchema = z.object({
    body: TranslationCreateParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
});

export const GenerateSpeechSchema = z.object({
    body: SpeechCreateParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
});
  

export class CreateTranscriptionDto extends createZodDto(CreateTranscriptionSchema) {}
export class CreateTranslationDto extends createZodDto(CreateTranslationSchema) {}
export class GenerateSpeechDto extends createZodDto(GenerateSpeechSchema) {}
