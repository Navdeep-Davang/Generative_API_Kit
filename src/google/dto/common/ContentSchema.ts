import { PartSchema } from "@/google/dto/common/PartSchema";
import { z } from "zod";

// Content schema
export const ContentSchema = z.object({
  role: z.string(),
  parts: z.array(PartSchema),
});