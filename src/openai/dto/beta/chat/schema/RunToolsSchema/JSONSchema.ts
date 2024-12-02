import { z } from 'zod';

// Basic JSON Schema Types
const JSONSchemaTypeNameSchema = z.union([
  z.literal("string"),
  z.literal("number"),
  z.literal("boolean"),
  z.literal("object"),
  z.literal("integer"),
  z.literal("array"),
  z.literal("null"),
]);

// Type annotation for JSONSchemaDefinitionSchema
const JSONSchemaDefinitionSchema: z.ZodObject<any> = z.object({
  $id: z.string().optional(),
  $comment: z.string().optional(),
  type: z.union([JSONSchemaTypeNameSchema, z.array(JSONSchemaTypeNameSchema)]).optional(),
  enum: z.array(z.unknown()).optional(),
  const: z.unknown().optional(),
  multipleOf: z.number().optional(),
  maximum: z.number().optional(),
  exclusiveMaximum: z.number().optional(),
  minimum: z.number().optional(),
  exclusiveMinimum: z.number().optional(),
  maxLength: z.number().optional(),
  minLength: z.number().optional(),
  pattern: z.string().optional(),
  items: z
    .union([z.lazy(() => JSONSchemaDefinitionSchema), z.array(z.lazy(() => JSONSchemaDefinitionSchema))])
    .optional(),
  additionalItems: z.lazy(() => JSONSchemaDefinitionSchema).optional(),
  maxItems: z.number().optional(),
  minItems: z.number().optional(),
  uniqueItems: z.boolean().optional(),
  contains: z.lazy(() => JSONSchemaDefinitionSchema).optional(),
  maxProperties: z.number().optional(),
  minProperties: z.number().optional(),
  required: z.array(z.string()).optional(),
  properties: z.record(z.string(), z.lazy(() => JSONSchemaDefinitionSchema)).optional(),
  patternProperties: z.record(z.string(), z.lazy(() => JSONSchemaDefinitionSchema)).optional(),
  additionalProperties: z.lazy(() => JSONSchemaDefinitionSchema).optional(),
  propertyNames: z.lazy(() => JSONSchemaDefinitionSchema).optional(),
  if: z.lazy(() => JSONSchemaDefinitionSchema).optional(),
  then: z.lazy(() => JSONSchemaDefinitionSchema).optional(),
  else: z.lazy(() => JSONSchemaDefinitionSchema).optional(),
  allOf: z.array(z.lazy(() => JSONSchemaDefinitionSchema)).optional(),
  anyOf: z.array(z.lazy(() => JSONSchemaDefinitionSchema)).optional(),
  oneOf: z.array(z.lazy(() => JSONSchemaDefinitionSchema)).optional(),
  not: z.lazy(() => JSONSchemaDefinitionSchema).optional(),
  format: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  default: z.unknown().optional(),
  readOnly: z.boolean().optional(),
  writeOnly: z.boolean().optional(),
  examples: z.unknown().optional(),
});

// JSONSchema itself can be any of the above, and we will allow more recursive definitions
export const JSONSchema = JSONSchemaDefinitionSchema;


