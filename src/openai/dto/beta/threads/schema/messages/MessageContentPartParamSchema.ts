import { z } from "zod";

const ImageFileContentBlockSchema = z.object({
    type: z.literal('image_file'),
    image_file: z.object({
      file_id: z.string(),
      detail: z.enum(['auto', 'low', 'high']).optional(),
    }),
});
  
const ImageUrlContentBlockSchema = z.object({
    type: z.literal('image_url'),
    image_url: z.object({
      url: z.string().url(),
      detail: z.enum(['auto', 'low', 'high']).optional(),
    }),
});
 
  
const TextContentBlockParamSchema = z.object({
    type: z.literal('text'),
    text: z.string(),
});
  

export const MessageContentPartParamSchema = z.union([
    ImageFileContentBlockSchema,
    ImageUrlContentBlockSchema,
    TextContentBlockParamSchema,
]);