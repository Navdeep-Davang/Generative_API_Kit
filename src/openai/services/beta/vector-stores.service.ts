import { ExtendedRequestOptionsDto } from '@/openai/dto/beta/threads/threads.dto';
import { CreateFileBatchDto, CreateVectorStoreDto, CreateVectorStoreFileDto, FileBatchCreateAndPollDto, FileCreateAndPollDto, ListFilesInFileBatchDto, ListVectorStoreFilesDto, ListVectorStoresDto, UpdateVectorStoreDto, UploadFileAndPollDto, UploadFileBatchDto, UploadFileDto } from '@/openai/dto/beta/vector-stores/vector-stores.dto';
import { RequestOptionsDto } from '@/openai/dto/openai/RequestOptions/request-options.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { Beta } from 'openai/resources';

@Injectable()
export class VectorStoresService {
    private openAIClient: OpenAI;
    private readonly vectorStores;
  
    constructor(private configService: ConfigService) {
        this.openAIClient = new OpenAI({
            apiKey: this.configService.get<string>('OPENAI_API_KEY')
        });

      this.vectorStores = new Beta(this.openAIClient).vectorStores;
    }


// VectorStores 5 Endpoints
    createVectorStore(createVectorStoreDto: CreateVectorStoreDto) {
        const {body, options} = createVectorStoreDto
        return this.vectorStores.create(body, options);
    }

    retrieveVectorStore(vectorStoreId: string, options?: RequestOptionsDto) {
        return this.vectorStores.retrieve(vectorStoreId, options);
    }

    updateVectorStore(vectorStoreId: string, updateVectorStoreDto: UpdateVectorStoreDto) {
        const {body, options} = updateVectorStoreDto
        return this.vectorStores.update(vectorStoreId, body, options);
    }

    listVectorStores(listVectorStoresDto: ListVectorStoresDto) {
        const {query, options} = listVectorStoresDto
        return this.vectorStores.list(query, options);
    }

    deleteVectorStore(vectorStoreId: string, options?: RequestOptionsDto) {
        return this.vectorStores.del(vectorStoreId, options);
    }

    // VectorStores-Files 8 Endpoints
        createVectorStoreFile(vectorStoreId: string, createVectorStoreFileDto: CreateVectorStoreFileDto) {
            const {body, options} = createVectorStoreFileDto
            return this.vectorStores.files.create(vectorStoreId, body, options);
        }

        retrieveVectorStoreFile(vectorStoreId: string, fileId: string, options?: RequestOptionsDto) {
            return this.vectorStores.files.retrieve(vectorStoreId, fileId, options);
        }

        listVectorStoreFiles(vectorStoreId: string, listVectorStoreFilesDto: ListVectorStoreFilesDto) {
            const {query, options} = listVectorStoreFilesDto
            return this.vectorStores.files.list(vectorStoreId, query, options);
        }

        deleteVectorStoreFile(vectorStoreId: string, fileId: string, options?: RequestOptionsDto) {
            return this.vectorStores.files.del(vectorStoreId, fileId, options);
        }

        createFileAndPoll(vectorStoreId: string, createAndPollDto: FileCreateAndPollDto) {
            const {body, options} = createAndPollDto
            return this.vectorStores.files.createAndPoll(vectorStoreId, body, options);
        }

        pollFile(vectorStoreId: string, fileId: string, options?: ExtendedRequestOptionsDto) {
            return this.vectorStores.files.poll(vectorStoreId, fileId, options);
        }

        uploadFile(vectorStoreId: string, uploadFileDto: UploadFileDto) {
            const {file, options} = uploadFileDto
            return this.vectorStores.files.upload(vectorStoreId, file, options);
        }

        uploadFileAndPoll(vectorStoreId: string, uploadFileAndPollDto: UploadFileAndPollDto) {
            const {file, options} = uploadFileAndPollDto
            return this.vectorStores.files.uploadAndPoll(vectorStoreId, file, options);
        }

    // VectorStores-FileBatch 7 Endpoints
        createVectorStoreFileBatch(vectorStoreId: string, createFileBatchDto: CreateFileBatchDto) {
            const {body, options} = createFileBatchDto
            return this.vectorStores.fileBatches.create(vectorStoreId, body, options);
        }

        retrieveVectorStoreFileBatch(vectorStoreId: string, batchId: string, options?: RequestOptionsDto) {
            return this.vectorStores.fileBatches.retrieve(vectorStoreId, batchId, options);
        }

        cancelVectorStoreFileBatch(vectorStoreId: string, batchId: string, options?: RequestOptionsDto) {
            return this.vectorStores.fileBatches.cancel(vectorStoreId, batchId, options);
        }

        createFileBatchAndPoll(vectorStoreId: string, createBatchDto: FileBatchCreateAndPollDto) {
            const {body, options} = createBatchDto
            return this.vectorStores.fileBatches.createAndPoll(vectorStoreId, body, options);
        }

        listFilesInVectorStoreFileBatch(vectorStoreId: string, batchId: string, listFilesInFileBatchDto: ListFilesInFileBatchDto) {
            const {query, options} = listFilesInFileBatchDto
            return this.vectorStores.fileBatches.listFiles(vectorStoreId, batchId, query, options);
        }

        pollFileBatch(vectorStoreId: string, batchId: string, options?: ExtendedRequestOptionsDto ) {
            return this.vectorStores.fileBatches.poll(vectorStoreId, batchId, options);
        }

        uploadFileBatchAndPoll(vectorStoreId: string, uploadFileBatchDto: UploadFileBatchDto) {
            const {payload, options} = uploadFileBatchDto
            return this.vectorStores.fileBatches.uploadAndPoll(vectorStoreId, payload, options );
        }
}
