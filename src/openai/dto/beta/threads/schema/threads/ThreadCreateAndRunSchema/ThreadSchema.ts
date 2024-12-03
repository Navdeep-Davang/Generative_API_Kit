import { z } from "zod";
import { MessageSchema } from "./MessageSchema";
import { ToolResourcesSchema } from "./ToolResourcesSchema";

export const ThreadSchema = z.object({
    messages: z.array(MessageSchema).optional(),
    metadata: z.unknown().nullable().optional(),
    tool_resources: ToolResourcesSchema.nullable().optional(),
  });