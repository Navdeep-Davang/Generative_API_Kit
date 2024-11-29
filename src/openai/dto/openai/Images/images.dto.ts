
import { z } from "zod";
import { createZodDto } from "nestjs-zod";
import { ImageCreateVariationParams$inboundSchema } from "./schema/CreateImageVariationSchema";
import { RequestOptionsSchema } from "../RequestOptions/schema/RequestOptionsSchema";
import { ImageEditParams$inboundSchema } from "./schema/EditImageSchema";
import { ImageGenerateParams$inboundSchema } from "./schema/GenerateImageSchema";


const CreateImageVariationSchema = z.object({
    body: ImageCreateVariationParams$inboundSchema,
    options: RequestOptionsSchema().optional(), // Make `options` optional
});

export const EditImageSchema = z.object({
    body: ImageEditParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
});

export const GenerateImageSchema  = z.object({
  body: ImageGenerateParams$inboundSchema,
  options: RequestOptionsSchema().optional(),
});

export class CreateImageVariationDto extends createZodDto(CreateImageVariationSchema) {}

export class EditImageDto extends createZodDto(EditImageSchema) {}

export class GenerateImageDto extends createZodDto(GenerateImageSchema) {}
