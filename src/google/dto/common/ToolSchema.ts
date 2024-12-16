import { z } from "zod";
import { Schema$Schema } from "./Schema";
import { DynamicRetrievalMode, SchemaType, Tool } from "@google/generative-ai";


//Schema for GoogleSearchRetrievalTool
const DynamicRetrievalModeSchema = z.nativeEnum(DynamicRetrievalMode)

const DynamicRetrievalConfigSchema = z.object({
    mode: DynamicRetrievalModeSchema.optional(),
    dynamicThreshold: z.number().optional(),
  });
  
const GoogleSearchRetrievalSchema = z.object({
    dynamicRetrievalConfig: DynamicRetrievalConfigSchema.optional(),
  });
  

const SchemaType$Schema = z.nativeEnum(SchemaType)


//Schema for FunctionDeclarations
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


  //All schemas
const FunctionDeclarationsToolSchema = z.object({
    functionDeclarations: z.array(FunctionDeclaration$Schema).optional(),
  });

const CodeExecutionToolSchema = z.object({
    codeExecution: z.object({}), 
    });

const GoogleSearchRetrievalToolSchema = z.object({
    googleSearchRetrieval: GoogleSearchRetrievalSchema.optional(),
});
    


export const ToolSchema = z.union([
    FunctionDeclarationsToolSchema,
    CodeExecutionToolSchema,
    GoogleSearchRetrievalToolSchema,
  ]) satisfies z.ZodType<Tool>;




