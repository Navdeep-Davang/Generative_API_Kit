
import { FunctionCallingMode } from "@google/generative-ai";
import { z } from "zod";

const FunctionCallingModeSchema = z.nativeEnum(FunctionCallingMode);

export const ToolConfigSchema = z.object({
    functionCallingConfig: z.object({
      mode: FunctionCallingModeSchema.optional(),
      allowedFunctionNames: z.array(z.string()).optional(),
    }),
});
