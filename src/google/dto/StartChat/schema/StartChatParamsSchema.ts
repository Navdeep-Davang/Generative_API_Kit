import { z } from "zod";
import { BaseParamsSchema } from "../../common/BaseParamsSchema";
import { ContentSchema } from "../../common/ContentSchema";
import { PartSchema } from "../../common/PartSchema";
import { DynamicRetrievalMode, SchemaType, StartChatParams } from "@google/generative-ai";
import { Schema$Schema } from "../../common/Schema";
import { ToolConfigSchema } from "../../common/ToolConfigSchema";


//Schema for GoogleSearchRetrievalTool
const DynamicRetrievalModeSchema = z.nativeEnum(DynamicRetrievalMode)

const DynamicRetrievalConfigSchema = z.object({
    mode: DynamicRetrievalModeSchema.optional(),
    dynamicThreshold: z.number().optional(),
  });
  
const GoogleSearchRetrievalSchema = z.object({
    dynamicRetrievalConfig: DynamicRetrievalConfigSchema.optional(),
  });
  

//Schema for FunctionDeclarations
const SchemaType$Schema = z.nativeEnum(SchemaType)

const FunctionDeclarationSchemaProperty$Schema = Schema$Schema;

const FunctionDeclarationSchema$Schema = z.object({
  type: SchemaType$Schema, // This assumes 'type' is part of the Schema$Schema
  properties: z.record(FunctionDeclarationSchemaProperty$Schema),
  description: z.string().optional(),
  required: z.array(z.string()).optional(),
});

const FunctionDeclaration$Schema = z.object({
    name: z.string().regex(/^[a-zA-Z_][a-zA-Z0-9_-]*$/, {
      message: 'Invalid function name. Must start with a letter or underscore and only include alphanumeric, underscores, or dashes.',
    }),
    description: z.string().optional(),
    parameters: FunctionDeclarationSchema$Schema.optional(), // Referencing pre-existing schema
  });


//Schema for FunctionCallingMode

//All Schemma
const FunctionDeclarationsToolSchema = z.object({
    functionDeclarations: z.array(FunctionDeclaration$Schema).optional(),
  });

const CodeExecutionToolSchema = z.object({
    codeExecution: z.object({}), // Empty object as per the specification
    });

const GoogleSearchRetrievalToolSchema = z.object({
    googleSearchRetrieval: GoogleSearchRetrievalSchema.optional(),
});
    

const ToolSchema = z.union([
    FunctionDeclarationsToolSchema,
    CodeExecutionToolSchema,
    GoogleSearchRetrievalToolSchema,
  ]);



export const StartChatParams$Schema = BaseParamsSchema.extend({
    history: z.array(ContentSchema).optional(),
    tools: z.array(ToolSchema).optional(),
    toolConfig: ToolConfigSchema.optional(),
    systemInstruction: z.union([z.string(), PartSchema, ContentSchema]).optional(), // Replace z.object({}) with PartSchema if defined
    cachedContent: z.string().optional(),
  }) satisfies z.ZodType<StartChatParams>;