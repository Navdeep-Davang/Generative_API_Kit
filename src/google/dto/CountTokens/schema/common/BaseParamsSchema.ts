import { z } from "zod";
import { HarmBlockThreshold, HarmCategory, ResponseSchema, Schema, SchemaType } from "@google/generative-ai";


const HarmCategorySchema = z.nativeEnum(HarmCategory);
const HarmBlockThresholdSchema = z.nativeEnum(HarmBlockThreshold);

const SafetySettingSchema = z.object({
    category: HarmCategorySchema,
    threshold: HarmBlockThresholdSchema,
});


const SchemaTypeSchema = z.nativeEnum(SchemaType);


const Schema$Schema: z.ZodType<Schema> = z.lazy(() =>
    z.object({
      type: SchemaTypeSchema.optional(),
      format: z.string().optional(),
      description: z.string().optional(),
      nullable: z.boolean().optional(),
      items: Schema$Schema.optional(), // Recursive definition for items
      enum: z.array(z.string()).optional(),
      properties: z.record(Schema$Schema).optional(), // Recursive definition for properties
      required: z.array(z.string()).optional(),
      example: z.unknown().optional(),
    })
);


const ResponseSchema$Schema = Schema$Schema satisfies z.ZodType<ResponseSchema>;


const GenerationConfigSchema = z.object({
    candidateCount: z.number().optional(),
    stopSequences: z.array(z.string()).optional(),
    maxOutputTokens: z.number().optional(),
    temperature: z.number().optional(),
    topP: z.number().optional(),
    topK: z.number().optional(),
    responseMimeType: z.string().optional(),
    responseSchema: ResponseSchema$Schema.optional(),
    presencePenalty: z.number().optional(),
    frequencyPenalty: z.number().optional(),
    responseLogprobs: z.boolean().optional(),
    logprobs: z.number().optional(),
  });


export const BaseParamsSchema = z.object({
    safetySettings: z.array(SafetySettingSchema).optional(),
    generationConfig: GenerationConfigSchema.optional(),
  });
