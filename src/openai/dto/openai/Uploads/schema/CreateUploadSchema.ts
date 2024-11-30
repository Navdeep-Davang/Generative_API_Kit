import { z } from 'zod';

// Define UploadCreateParams$inboundSchema
export const UploadCreateParams$inboundSchema = z.object({
  bytes: z.number().int().positive(), // Number of bytes must be a positive integer
  filename: z.string(), // Filename as a string
  mime_type: z.string(), // MIME type as a string
  purpose: z.enum(['assistants', 'batch', 'fine-tune', 'vision']), // Enum for valid purposes
});
