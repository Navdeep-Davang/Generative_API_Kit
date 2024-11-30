import { z } from 'zod';


// Define BatchCreateParams$inboundSchema
export const BatchCreateParams$inboundSchema = z.object({
  completion_window: z.literal('24h'), // Only '24h' is supported
  endpoint: z.enum(['/v1/chat/completions', '/v1/embeddings', '/v1/completions']), // Supported endpoints
  input_file_id: z.string(), // File ID for batch requests
  metadata: z.record(z.string()).nullable().optional(), // Optional metadata as a key-value pair
});
