import { z } from "zod";
import { UploadableSchema } from "../../Files/schema/CreateFileSchema";

export const PartCreateParams$inboundSchema = z.object({
    data: UploadableSchema, // Use the predefined UploadableSchema
  });