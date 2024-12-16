import { z } from "zod";
import { BaseParamsSchema } from "./BaseParamsSchema";
import { ToolSchema } from "./ToolSchema";
import { ToolConfigSchema } from "./ToolConfigSchema";
import { PartSchema } from "./PartSchema";
import { ContentSchema } from "./ContentSchema";
import { ModelParams } from "@google/generative-ai";


const CachedContentBaseSchema = z.object({
    model: z.string().optional(), // Optional string for `model`
    contents: z.array(ContentSchema), // Required array of `Content`
    tools: z.array(ToolSchema).optional(), // Optional array of `Tool`
    toolConfig: ToolConfigSchema.optional(), // Optional `ToolConfig`
    systemInstruction: z.union([
      z.string(),
      PartSchema,
      ContentSchema,
    ]).optional(), // Optional union for `systemInstruction`
    expireTime: z.string().optional(), // Optional ISO string for expiration time
    displayName: z.string().optional(), // Optional string for display name
  });
  

const CachedContentSchema = CachedContentBaseSchema.extend({
    name: z.string().optional(), // Optional string for `name`
    ttl: z.string().optional(), // Optional string for TTL in protobuf.Duration format
    createTime: z.string().optional(), // Optional ISO string for creation time
    updateTime: z.string().optional(), // Optional ISO string for update time
  });
  

export const ModelParamsSchema = BaseParamsSchema.extend({
    model: z.string(), // `model` is required and must be a string
    tools: z.array(ToolSchema).optional(), // Optional array of `Tool` objects
    toolConfig: ToolConfigSchema.optional(), // Optional `ToolConfig` object
    systemInstruction: z.union([
      z.string(),
      PartSchema,
      ContentSchema,
    ]).optional(), // Optional field that can be a string, `Part`, or `Content`
    cachedContent: CachedContentSchema.optional(), // Optional `CachedContent` object
  }) satisfies z.ZodType<ModelParams>;
  