import { z } from "zod";
import { RequestOptionsSchema } from "../../openai/RequestOptions/schema/RequestOptionsSchema";
import { VectorStoreCreateParams$inboundSchema } from "./CreateVectorStoreSchema";
import { createZodDto } from "nestjs-zod";
import { VectorStoreUpdateParams$inboundSchema } from "./UpdateVectorStoreSchema";
import { VectorStoreListParams$inboundSchema } from "./ListVectorStoresSchema";
import { FileListParams$inboundSchema } from "./ListVectorStoreFilesSchema";
import { FileCreateParams$inboundSchema } from "./common/FileCreateParamsSchema";
import { ExtendedRequestOptionsSchema } from "../threads/schema/runs/common/ExtendedRequestOptionsSchema";
import { UploadableSchema } from "../../common/UploadableSchema";
import { FileBatchCreateParams$inboundSchema } from "./CreateFileBatchSchema";
import { FileBatchListFilesParams$inboundSchema } from "./ListFilesInFileBatchSchema";
import { FileBatchRequestOptionsSchema } from "./UploadFileBatchSchema";

// VectorStores Schema
export const CreateVectorStoreSchema = z.object({
    body: VectorStoreCreateParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
});

export const UpdateVectorStoreSchema = z.object({
    body: VectorStoreUpdateParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
});

export const ListVectorStoresSchema = z.object({
    query: VectorStoreListParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
});



// VectorStores-Files Schema
export const CreateVectorStoreFileSchema = z.object({
    body: FileCreateParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
});

export const ListVectorStoreFilesSchema = z.object({
    query: FileListParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
});

export const FileCreateAndPollSchema = z.object({
    body: FileCreateParams$inboundSchema,
    options: ExtendedRequestOptionsSchema.optional(),
});

export const UploadFileSchema = z.object({
    file: UploadableSchema,
    options: RequestOptionsSchema().optional(),
});

export const UploadFileAndPollSchema = z.object({
    file: UploadableSchema,
    options: ExtendedRequestOptionsSchema.optional(),
});



// VectorStores-FileBatch Schema
export const CreateFileBatchSchema = z.object({
    body: FileBatchCreateParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
});

export const FileBatchCreateAndPollSchema = z.object({
    body: FileBatchCreateParams$inboundSchema,
    options: ExtendedRequestOptionsSchema.optional(),
});

export const ListFilesInFileBatchSchema = z.object({
    query: FileBatchListFilesParams$inboundSchema,
    options: RequestOptionsSchema().optional(),
});


export const UploadFileBatchSchema = z.object({
    payload: z.object({
      files: z.array(UploadableSchema), // Required array of Uploadable items
      fileIds: z.array(z.string()).optional(), // Defaults to empty array
    }),
    options: FileBatchRequestOptionsSchema.optional(), // Optional extended request options
});





// VectorStores DTO
export class CreateVectorStoreDto extends createZodDto(CreateVectorStoreSchema) {}
export class UpdateVectorStoreDto extends createZodDto(UpdateVectorStoreSchema) {}
export class ListVectorStoresDto extends createZodDto(ListVectorStoresSchema) {}

// VectorStores-Files DTO
export class CreateVectorStoreFileDto extends createZodDto(CreateVectorStoreFileSchema) {}
export class ListVectorStoreFilesDto extends createZodDto(ListVectorStoreFilesSchema) {}
export class FileCreateAndPollDto extends createZodDto(FileCreateAndPollSchema) {}
export class UploadFileDto extends createZodDto(UploadFileSchema) {}
export class UploadFileAndPollDto extends createZodDto(UploadFileAndPollSchema) {}

// VectorStores-FileBatch DTO
export class CreateFileBatchDto extends createZodDto(CreateFileBatchSchema) {}
export class FileBatchCreateAndPollDto extends createZodDto(FileBatchCreateAndPollSchema) {}
export class ListFilesInFileBatchDto extends createZodDto(ListFilesInFileBatchSchema) {}
export class UploadFileBatchDto extends createZodDto(UploadFileBatchSchema) {}

