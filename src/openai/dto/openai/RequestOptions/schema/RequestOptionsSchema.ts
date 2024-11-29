import { z } from 'zod';
import { type Readable } from 'stream';
import type { BlobLike } from 'openai/uploads';
import { type RequestOptions } from 'openai/core';

export const HTTPMethodEnum = z.enum(['get', 'post', 'put', 'patch', 'delete']);

export const RequestOptionsSchema = <
  Req extends
    | unknown
    | Record<string, unknown>
    | Readable
    | BlobLike
    | ArrayBufferView
    | ArrayBuffer
>() =>
  z.object({
    method: HTTPMethodEnum.optional(),
    path: z.string().optional(),
    query: z.any().optional(),
    body: z.any().optional(),
    headers: z.record(z.string()).optional(),
    maxRetries: z.number().optional(),
    stream: z.boolean().optional(),
    timeout: z.number().optional(),
    httpAgent: z.any().optional(),
    signal: z.any().optional(),
    idempotencyKey: z.string().optional(),
    __binaryRequest: z.boolean().optional(),
    __binaryResponse: z.boolean().optional(),
    __streamClass: z.any().optional(),
  }) satisfies z.ZodType<RequestOptions<Req>>;
