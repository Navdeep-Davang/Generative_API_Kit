import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Beta } from 'openai/resources';

@Injectable()
export class VectorStoresService {
    private openAIClient: OpenAI;
    private readonly vectorStores;
  
    constructor() {    
      this.openAIClient = new OpenAI({
        apiKey: 'your-api-key', // Use environment variables for API key or configuration
      });
      
      this.vectorStores = new Beta(this.openAIClient).vectorStores;
    }


// VectorStores 5 Endpoints
    createVectorStore(createVectorStoreDto: CreateVectorStoreDto) {
        return this.vectorStores.create(createVectorStoreDto);
    }

    retrieveVectorStore(vectorStoreId: string) {
        return this.vectorStores.retrieve(vectorStoreId);
    }

    updateVectorStore(vectorStoreId: string, updateVectorStoreDto: UpdateVectorStoreDto) {
        return this.vectorStores.update(vectorStoreId, updateVectorStoreDto);
    }

    listVectorStores(query: ListVectorStoresDto) {
        return this.vectorStores.list(query);
    }

    deleteVectorStore(vectorStoreId: string) {
        return this.vectorStores.delete(vectorStoreId);
    }

    // VectorStores-Files 8 Endpoints
        createVectorStoreFile(vectorStoreId: string, createVectorStoreFileDto: CreateVectorStoreFileDto) {
            return this.vectorStores.files.create(vectorStoreId, createVectorStoreFileDto);
        }

        retrieveVectorStoreFile(vectorStoreId: string, fileId: string) {
            return this.vectorStores.files.retrieve(vectorStoreId, fileId);
        }

        listVectorStoreFiles(vectorStoreId: string, query: ListVectorStoreFilesDto) {
            return this.vectorStores.files.list(vectorStoreId, query);
        }

        deleteVectorStoreFile(vectorStoreId: string, fileId: string) {
            return this.vectorStores.files.delete(vectorStoreId, fileId);
        }

        createFileAndPoll(vectorStoreId: string, createAndPollDto: FileCreateParamsDto) {
            return this.vectorStores.files.createAndPoll(vectorStoreId, createAndPollDto);
        }

        pollFile(vectorStoreId: string, fileId: string, options: { pollIntervalMs?: number }) {
            return this.vectorStores.files.poll(vectorStoreId, fileId, options);
        }

        uploadFile(vectorStoreId: string, uploadDto: UploadFileDto) {
            return this.vectorStores.files.upload(vectorStoreId, uploadDto);
        }

        uploadFileAndPoll(vectorStoreId: string, uploadAndPollDto: UploadFileDto) {
            return this.vectorStores.files.uploadAndPoll(vectorStoreId, uploadAndPollDto);
        }

    // VectorStores-FileBatch 7 Endpoints
        createVectorStoreFileBatch(vectorStoreId: string, createFileBatchDto: CreateFileBatchDto) {
            return this.vectorStores.fileBatches.create(vectorStoreId, createFileBatchDto);
        }

        retrieveVectorStoreFileBatch(vectorStoreId: string, batchId: string) {
            return this.vectorStores.fileBatches.retrieve(vectorStoreId, batchId);
        }

        cancelVectorStoreFileBatch(vectorStoreId: string, batchId: string) {
            return this.vectorStores.fileBatches.cancel(vectorStoreId, batchId);
        }

        createFileBatchAndPoll(vectorStoreId: string, createBatchDto: FileBatchCreateParamsDto) {
            return this.vectorStores.fileBatches.createAndPoll(vectorStoreId, createBatchDto);
        }

        listFilesInVectorStoreFileBatch(vectorStoreId: string, batchId: string, query: ListFilesInFileBatchDto) {
            return this.vectorStores.fileBatches.listFiles(vectorStoreId, batchId, query);
        }

        pollFileBatch(vectorStoreId: string, batchId: string, options: { pollIntervalMs?: number }) {
            return this.vectorStores.fileBatches.poll(vectorStoreId, batchId, options);
        }

        uploadFileBatchAndPoll(vectorStoreId: string, uploadBatchDto: UploadFileBatchDto) {
            return this.vectorStores.fileBatches.uploadAndPoll(vectorStoreId, uploadBatchDto);
        }
}
