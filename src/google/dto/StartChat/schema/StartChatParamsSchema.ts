import { z } from "zod";
import { BaseParamsSchema } from "../../CountTokens/schema/common/BaseParamsSchema";
import { ContentSchema } from "../../BmbedContent/schema/common/ContentSchema";
import { PartSchema } from "../../BatchEmbedContents/schema/common/PartSchema";
import { DynamicRetrievalMode } from "@google/generative-ai";


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
const FunctionDeclarationSchema = z.object({
    name: z.string().regex(/^[a-zA-Z_][a-zA-Z0-9_-]*$/, {
      message: 'Invalid function name. Must start with a letter or underscore and only include alphanumeric, underscores, or dashes.',
    }),
    description: z.string().optional(),
    parameters: FunctionDeclarationSchema$Schema.optional(), // Referencing pre-existing schema
  });


  
//All Schemma
const FunctionDeclarationsToolSchema = z.object({
    functionDeclarations: z.array(FunctionDeclarationSchema).optional(),
  });

const CodeExecutionToolSchema = z.object({
    codeExecution: z.object({}), // Empty object as per the specification
    });

const GoogleSearchRetrievalToolSchema = z.object({
    googleSearchRetrieval: GoogleSearchRetrievalSchema.optional(),
});
    

export const ToolSchema = z.union([
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
  });