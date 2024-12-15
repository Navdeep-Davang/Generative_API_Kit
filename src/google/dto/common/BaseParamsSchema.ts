import { z } from "zod";
import { HarmBlockThreshold, HarmCategory, ResponseSchema, Schema, SchemaType } from "@google/generative-ai";
import { Schema$Schema } from "./Schema";


const HarmCategorySchema = z.nativeEnum(HarmCategory);
const HarmBlockThresholdSchema = z.nativeEnum(HarmBlockThreshold);

const SafetySettingSchema = z.object({
    category: HarmCategorySchema,
    threshold: HarmBlockThresholdSchema,
});


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
