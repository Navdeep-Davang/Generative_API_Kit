import { z } from "zod";
import { ContentSchema } from "../../BmbedContent/schema/common/ContentSchema";
import { PartSchema } from "../../BatchEmbedContents/schema/common/PartSchema";
import { HarmBlockThreshold, HarmCategory, SchemaType } from "@google/generative-ai";




const HarmCategorySchema = z.nativeEnum(HarmCategory);
const HarmBlockThresholdSchema = z.nativeEnum(HarmBlockThreshold);
const SchemaTypeSchema = z.nativeEnum(SchemaType);



export const SafetySettingSchema = z.object({
    category: HarmCategorySchema,
    threshold: HarmBlockThresholdSchema,
});

export const Schema$Schema = z.lazy(() =>
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
  

const ResponseSchema$Schema = Schema$Schema;

export const GenerationConfigSchema = z.object({
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


export const GenerateContentRequest$Schema = BaseParamsSchema.extend({
    contents: z.array(ContentSchema),
    tools: z.array(z.any()).optional(), // Replace `z.any()` with the actual schema for `Tool` if available
    toolConfig: z.any().optional(), // Replace `z.any()` with the actual schema for `ToolConfig` if available
    systemInstruction: z.union([z.string(), PartSchema, ContentSchema]).optional(),
    cachedContent: z.string().optional(),
  });


export const CountTokensRequest$Schema = z.object({
    generateContentRequest: GenerateContentRequest$Schema.optional(),
    contents: z.array(ContentSchema).optional(),
  });