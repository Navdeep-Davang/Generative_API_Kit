import { BatchEmbedContentsRequest } from '@google/generative-ai';
import { z } from 'zod';
import { EmbedContentRequest$Schema } from '../../BmbedContent/schema/common/EmbedContentRequestSchema';

// BatchEmbedContentsRequest schema
export const BatchEmbedContentsRequest$Schema = z.object({
  requests: z.array(EmbedContentRequest$Schema),
})satisfies z.ZodType<BatchEmbedContentsRequest>;
