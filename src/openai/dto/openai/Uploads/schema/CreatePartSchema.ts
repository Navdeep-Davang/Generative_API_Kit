import { z } from "zod";
import { UploadableSchema } from "@/openai/dto/common/UploadableSchema";



export const PartCreateParams$inboundSchema = z.object({
    data: UploadableSchema, // Use the predefined UploadableSchema
  });