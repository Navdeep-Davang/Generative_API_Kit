import { EmbedContentRequest, TaskType } from "@google/generative-ai";
import { z } from "zod";
import { PartSchema } from "../../../BatchEmbedContents/schema/common/PartSchema";
import { ContentSchema } from "./ContentSchema";

// Enums
const TaskTypeSchema = z.nativeEnum(TaskType);

// EmbedContentRequest schema
export const EmbedContentRequest$Schema = z.object({
  content: ContentSchema,
  taskType: TaskTypeSchema.optional(),
  title: z.string().optional(),
}) satisfies z.ZodType<EmbedContentRequest>;