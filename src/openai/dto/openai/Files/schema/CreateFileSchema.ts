import { UploadableSchema } from '@/openai/dto/common/UploadableSchema';
import { z } from 'zod';


const FilePurposeEnum = z.enum(['assistants', 'batch', 'fine-tune', 'vision']);


export const FileCreateParams$inboundSchema = z.object({
  file: UploadableSchema,
  purpose: FilePurposeEnum,
});
