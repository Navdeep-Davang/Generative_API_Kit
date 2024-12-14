import { BatchEmbedContentsRequest } from '@google/generative-ai';
import { z } from 'zod';
import { EmbedContentRequestSchema } from '../../BmbedContent/schema/EmbedContentRequestSchema';


// BatchEmbedContentsRequest schema
export const BatchEmbedContentsRequest$Schema = z.object({
  requests: z.array(EmbedContentRequestSchema),
})satisfies z.ZodType<BatchEmbedContentsRequest>;
