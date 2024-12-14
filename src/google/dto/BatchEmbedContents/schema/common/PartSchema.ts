import { ExecutableCodeLanguage, Outcome } from "@google/generative-ai";
import { z } from "zod";


export const ExecutableCodeLanguageSchema = z.nativeEnum(ExecutableCodeLanguage);

const OutcomeSchema = z.nativeEnum(Outcome);


// Schemas for parts
const TextPartSchema = z.object({
    text: z.string(),
    inlineData: z.undefined().optional(),
    functionCall: z.undefined().optional(),
    functionResponse: z.undefined().optional(),
    fileData: z.undefined().optional(),
    executableCode: z.undefined().optional(),
    codeExecutionResult: z.undefined().optional(),
  }).refine(data => 
    !data.inlineData &&
    !data.functionCall &&
    !data.functionResponse &&
    !data.fileData &&
    !data.executableCode &&
    !data.codeExecutionResult, {
      message: "Only 'text' field is allowed in TextPart, others must not be present.",
    });


const InlineDataPartSchema = z.object({
    inlineData: z.object({
    mimeType: z.string(),
    data: z.string(),
    }),
    text: z.undefined().optional(),
    functionCall: z.undefined().optional(),
    functionResponse: z.undefined().optional(),
    fileData: z.undefined().optional(),
    executableCode: z.undefined().optional(),
    codeExecutionResult: z.undefined().optional(),
    }).refine(data => 
    !data.text &&
    !data.functionCall &&
    !data.functionResponse &&
    !data.fileData &&
    !data.executableCode &&
    !data.codeExecutionResult, {
        message: "Invalid fields for InlineDataPart, only 'inlineData' is allowed.",
    });
    

const FunctionCallPartSchema = z.object({
  functionCall: z.object({
    name: z.string(),
    args: z.object({
      // Define the structure of the args object here
    }),
  }),
  text: z.undefined().optional(),
  inlineData: z.undefined().optional(),
  functionResponse: z.undefined().optional(),
  fileData: z.undefined().optional(),
  executableCode: z.undefined().optional(),
  codeExecutionResult: z.undefined().optional(),
}).refine(data => 
  !data.text &&
  !data.inlineData &&
  !data.functionResponse &&
  !data.fileData &&
  !data.executableCode &&
  !data.codeExecutionResult, {
    message: "Invalid fields for FunctionCallPart, only 'functionCall' is allowed.",
  });


const FunctionResponsePartSchema = z.object({
  functionResponse: z.object({
    name: z.string(),
    response: z.object({
      // Define the structure of the response object here
    }),
  }),
  text: z.undefined().optional(),
  inlineData: z.undefined().optional(),
  functionCall: z.undefined().optional(),
  fileData: z.undefined().optional(),
  executableCode: z.undefined().optional(),
  codeExecutionResult: z.undefined().optional(),
}).refine(data => 
  !data.text &&
  !data.inlineData &&
  !data.functionCall &&
  !data.fileData &&
  !data.executableCode &&
  !data.codeExecutionResult, {
    message: "Invalid fields for FunctionResponsePart, only 'functionResponse' is allowed.",
  });

const FileDataPartSchema = z.object({
  fileData: z.object({
    mimeType: z.string(),
    fileUri: z.string(),
  }),
  text: z.undefined().optional(),
  inlineData: z.undefined().optional(),
  functionCall: z.undefined().optional(),
  functionResponse: z.undefined().optional(),
  executableCode: z.undefined().optional(),
  codeExecutionResult: z.undefined().optional(),
}).refine(data => 
  !data.text &&
  !data.inlineData &&
  !data.functionCall &&
  !data.functionResponse &&
  !data.executableCode &&
  !data.codeExecutionResult, {
    message: "Invalid fields for FileDataPart, only 'fileData' is allowed.",
  });


const ExecutableCodePartSchema = z.object({
  executableCode: z.object({
    language: ExecutableCodeLanguageSchema,
    code: z.string(),
  }),
  text: z.undefined().optional(),
  inlineData: z.undefined().optional(),
  functionCall: z.undefined().optional(),
  functionResponse: z.undefined().optional(),
  fileData: z.undefined().optional(),
  codeExecutionResult: z.undefined().optional(),
}).refine(data => 
  !data.text &&
  !data.inlineData &&
  !data.functionCall &&
  !data.functionResponse &&
  !data.fileData &&
  !data.codeExecutionResult, {
    message: "Invalid fields for ExecutableCodePart, only 'executableCode' is allowed.",
  });


const CodeExecutionResultPartSchema = z.object({
  codeExecutionResult: z.object({
    outcome: OutcomeSchema,
    output: z.string(),
  }),
  text: z.undefined().optional(),
  inlineData: z.undefined().optional(),
  functionCall: z.undefined().optional(),
  functionResponse: z.undefined().optional(),
  fileData: z.undefined().optional(),
  executableCode: z.undefined().optional(),
}).refine(data => 
  !data.text &&
  !data.inlineData &&
  !data.functionCall &&
  !data.functionResponse &&
  !data.fileData &&
  !data.executableCode, {
    message: "Invalid fields for CodeExecutionResultPart, only 'codeExecutionResult' is allowed.",
  });




// Part schema (one of the above parts)
export const PartSchema = z.union([
  TextPartSchema,
  InlineDataPartSchema,
  FunctionCallPartSchema,
  FunctionResponsePartSchema,
  FileDataPartSchema,
  ExecutableCodePartSchema,
  CodeExecutionResultPartSchema,
]);