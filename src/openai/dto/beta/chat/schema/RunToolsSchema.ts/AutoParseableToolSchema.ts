import { z } from 'zod';

// AutoParseableTool Schema
export const AutoParseableToolSchema = <OptionsT extends { name: string; arguments: any; function?: ((args: any) => any) | undefined }>(
  optionsT: OptionsT
) => {
  const HasFunctionSchema = optionsT.function
    ? z.literal(true)  // If function exists, __hasFunction is true
    : z.literal(false);  // Otherwise, it's false

  return z.object({
    __arguments: z.unknown().refine((val) => typeof val === 'object', { message: 'arguments must be an object' }), // __arguments should be an object
    __name: z.string(),  // __name should be a string
    __hasFunction: HasFunctionSchema,  // __hasFunction is true/false based on the function type
    $brand: z.literal('auto-parseable-tool'),  // Static brand field
    $callback: optionsT.function
      ? z.function().args(z.unknown()).returns(z.unknown()).optional()  // If a function exists in optionsT, $callback should be a function
      : z.undefined().optional(),  // Otherwise, it's undefined
    $parseRaw: z.function().args(z.string()).returns(z.unknown()),  // $parseRaw should be a function accepting a string and returning unknown
  }).refine((data) => {
    // Ensuring that __hasFunction matches the actual function presence
    return data.__hasFunction === (optionsT.function ? true : false);
  }, {
    message: "__hasFunction should correctly reflect the presence of a function in ToolOptions"
  });
};

