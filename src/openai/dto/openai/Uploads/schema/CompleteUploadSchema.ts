import { z } from "zod";

export const UploadCompleteParams$inboundSchema = z.object({
    part_ids: z.array(z.string()), // Array of strings representing Part IDs
    md5: z.string().optional(),    // Optional md5 checksum as a string
  });