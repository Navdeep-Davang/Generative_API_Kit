import { SingleRequestOptions } from '@google/generative-ai';
import { z } from 'zod';
import { RequestOptionsSchema } from '../../RequestOptions/schema/RequestOptionsSchema';


// Define the SingleRequestOptions schema by extending RequestOptionsSchema
export const SingleRequestOptionsSchema = RequestOptionsSchema.extend({
  signal: z.instanceof(AbortSignal).optional(),
}) satisfies z.ZodType<SingleRequestOptions>;
