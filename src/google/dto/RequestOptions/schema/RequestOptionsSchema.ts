import { RequestOptions } from "@google/generative-ai";
import { z } from "zod";


export const RequestOptionsSchema = z.object({
    timeout: z.number().int().positive().optional(), // Optional positive integer for timeout in milliseconds
    apiVersion: z.string().optional(), // Optional string for API version
    apiClient: z.string().optional(), // Optional string for additional attribution info
    baseUrl: z.string().url().optional(), // Optional valid URL string for base endpoint
    customHeaders: z.union([
      z.custom<Headers>(), // Allow `Headers` object (native to the browser or Node.js)
      z.record(z.string(), z.string()), // Or a record of string keys and values
    ]).optional(), // Optional custom HTTP headers
  }) satisfies z.ZodType<RequestOptions>;
  

