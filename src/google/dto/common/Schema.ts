import { z } from "zod";
import { Schema, SchemaType } from "@google/generative-ai";

const SchemaTypeSchema = z.nativeEnum(SchemaType);


export const Schema$Schema: z.ZodType<Schema> = z.lazy(() =>
    z.object({
      type: SchemaTypeSchema.optional(),
      format: z.string().optional(),
      description: z.string().optional(),
      nullable: z.boolean().optional(),
      items: Schema$Schema.optional(), // Recursive definition for items
      enum: z.array(z.string()).optional(),
      properties: z.record(Schema$Schema).optional(), // Recursive definition for properties
      required: z.array(z.string()).optional(),
      example: z.unknown().optional(),
    })
);
