import { z } from 'zod';
import { ReadStream } from 'fs'; // For FsReadStream
import { Uploadable } from 'openai/core';

export const UploadableSchema = z.custom<Uploadable>((value) => {
    if (value) {
      
    if (
        'size' in value && typeof value.size === 'number' &&
        'type' in value && typeof value.type === 'string' &&
        'text' in value && typeof value.text === 'function' &&
        'slice' in value && typeof value.slice === 'function' &&
        'lastModified' in value && typeof value.lastModified === 'number' &&
        'name' in value && typeof value.name === 'string'
      ) {
        return true; 
      }
  
    if (
        'url' in value && typeof value.url === 'string' &&
        'blob' in value && typeof value.blob === 'function'
      ) {
        return true; 
      }
  
    if (value instanceof ReadStream) {
        return true; 
      }
    }
    return false; 
  }, {
    message: "Invalid file type. Expected FileLike, ResponseLike, or FsReadStream.",
  });

const FilePurposeEnum = z.enum(['assistants', 'batch', 'fine-tune', 'vision']);


export const FileCreateParams$inboundSchema = z.object({
  file: UploadableSchema,
  purpose: FilePurposeEnum,
});
