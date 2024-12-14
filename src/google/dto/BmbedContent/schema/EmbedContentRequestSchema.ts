import { TaskType } from "@google/generative-ai";
import { z } from "zod";
import { PartSchema } from "../../BatchEmbedContents/schema/common/PartSchema";

// Enums
export const TaskTypeSchema = z.nativeEnum(TaskType);

// Content schema
const ContentSchema = z.object({
  role: z.string(),
  parts: z.array(PartSchema),
});

// EmbedContentRequest schema
export const EmbedContentRequestSchema = z.object({
  content: ContentSchema,
  taskType: TaskTypeSchema.optional(),
  title: z.string().optional(),
});