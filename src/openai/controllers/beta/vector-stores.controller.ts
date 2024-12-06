import { BetaController } from '@/openai/decorators/openai-beta-controller';
import { ExtendedRequestOptionsDto } from '@/openai/dto/beta/threads/threads.dto';
import { CreateFileBatchDto, CreateVectorStoreDto, CreateVectorStoreFileDto, FileBatchCreateAndPollDto, FileCreateAndPollDto, ListFilesInFileBatchDto, ListVectorStoreFilesDto, ListVectorStoresDto, UpdateVectorStoreDto, UploadFileAndPollDto, UploadFileBatchDto, UploadFileDto } from '@/openai/dto/beta/vector-stores/vector-stores.dto';
import { RequestOptionsDto } from '@/openai/dto/openai/RequestOptions/request-options.dto';
import { VectorStoresService } from '@/openai/services/beta/vector-stores.service';
import {  Post, Body, Param, Get, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Beta - Vector Stores')
@BetaController('vector-stores')
export class VectorStoresController {
    // Total 20 Endpoints
    constructor(private readonly VectorStoresService: VectorStoresService) {}

// VectorStores 5 Endpoints 
    @ApiOperation({ summary: 'Create a vector store' })
    @Post()
    async createVectorStore(@Body() body: CreateVectorStoreDto) {
        return this.VectorStoresService.createVectorStore(body);
    }

    @ApiOperation({ summary: 'Retrieve a vector store' })
    @Get(':vectorStoreId')
    async retrieveVectorStore(
        @Param('vectorStoreId') vectorStoreId: string,
        @Body() options?: RequestOptionsDto
    ) {
        return this.VectorStoresService.retrieveVectorStore(vectorStoreId, options);
    }

    @ApiOperation({ summary: 'Update a vector store' })
    @Post(':vectorStoreId')
    async updateVectorStore(
        @Param('vectorStoreId') vectorStoreId: string,
        @Body() body: UpdateVectorStoreDto,
    ) {
        return this.VectorStoresService.updateVectorStore(vectorStoreId, body);
    }

    @ApiOperation({ summary: 'List all vector stores' })
    @Get()
    async listVectorStores(@Body() query: ListVectorStoresDto) {
        return this.VectorStoresService.listVectorStores(query);
    }

    @ApiOperation({ summary: 'Delete a vector store' })
    @Delete(':vectorStoreId')
    deleteVectorStore(
        @Param('vectorStoreId') vectorStoreId: string,
        @Body() options?: RequestOptionsDto
    ) {
        return this.VectorStoresService.deleteVectorStore(vectorStoreId, options);
    }

    // VectorStores-Files 8 Endpoints
        @ApiOperation({ summary: 'Create a vector store file' })
        @Post(':vectorStoreId/files')
        async createVectorStoreFile(
            @Param('vectorStoreId') vectorStoreId: string,
            @Body() body: CreateVectorStoreFileDto,
        ) {
            return this.VectorStoresService.createVectorStoreFile(vectorStoreId, body);
        }

        @ApiOperation({ summary: 'Retrieve a vector store file' })
        @Get(':vectorStoreId/files/:fileId')
        async retrieveVectorStoreFile(
            @Param('vectorStoreId') vectorStoreId: string,
            @Param('fileId') fileId: string,
            @Body() options?: RequestOptionsDto
        ) {
            return this.VectorStoresService.retrieveVectorStoreFile(vectorStoreId, fileId, options);
        }

        @ApiOperation({ summary: 'List all vector store files' })
        @Get(':vectorStoreId/files')
        async listVectorStoreFiles(
            @Param('vectorStoreId') vectorStoreId: string,
            @Body() query: ListVectorStoreFilesDto,
        ) {
            return this.VectorStoresService.listVectorStoreFiles(vectorStoreId, query);
        }

        @ApiOperation({ summary: 'Delete a vector store file' })
        @Delete(':vectorStoreId/files/:fileId')
        async deleteVectorStoreFile(
            @Param('vectorStoreId') vectorStoreId: string,
            @Param('fileId') fileId: string,
            @Body() options?: RequestOptionsDto
        ) {
            return this.VectorStoresService.deleteVectorStoreFile(vectorStoreId, fileId, options);
        }

        @ApiOperation({ summary: 'Create a vector store file and poll until complete' })
        @Post(':vectorStoreId/files/create-and-poll')
        async createFileAndPoll(
            @Param('vectorStoreId') vectorStoreId: string,
            @Body() createAndPollDto: FileCreateAndPollDto,
        ) {
            return this.VectorStoresService.createFileAndPoll(vectorStoreId, createAndPollDto);
        }

        @ApiOperation({ summary: 'Poll the processing status of a vector store file' })
        @Get(':vectorStoreId/files/:fileId/poll')
        async pollFile(
            @Param('vectorStoreId') vectorStoreId: string,
            @Param('fileId') fileId: string,
            @Body() options?: ExtendedRequestOptionsDto
        ) {
            return this.VectorStoresService.pollFile(vectorStoreId, fileId, options);
        }

        @ApiOperation({ summary: 'Upload a file to a vector store' })
        @Post(':vectorStoreId/files/upload')
        async uploadFile(
            @Param('vectorStoreId') vectorStoreId: string,
            @Body() body: UploadFileDto,
        ) {
            return this.VectorStoresService.uploadFile(vectorStoreId, body);
        }

        @ApiOperation({ summary: 'Upload a file to a vector store and poll until complete' })
        @Post(':vectorStoreId/files/upload-and-poll')
        uploadFileAndPoll(
            @Param('vectorStoreId') vectorStoreId: string,
            @Body() body: UploadFileAndPollDto,
        ) {
            return this.VectorStoresService.uploadFileAndPoll(vectorStoreId, body);
        }

    // VectorStores-FileBatch 7 Endpoints
        @ApiOperation({ summary: 'Create a vector store file batch' })
        @Post(':vectorStoreId/file-batches')
        createVectorStoreFileBatch(
            @Param('vectorStoreId') vectorStoreId: string,
            @Body() body: CreateFileBatchDto,
        ) {
            return this.VectorStoresService.createVectorStoreFileBatch(vectorStoreId, body);
        }

        @ApiOperation({ summary: 'Retrieve a vector store file batch' })
        @Get(':vectorStoreId/file-batches/:batchId')
        async retrieveVectorStoreFileBatch(
            @Param('vectorStoreId') vectorStoreId: string,
            @Param('batchId') batchId: string,
            @Body() options?: RequestOptionsDto
        ) {
            return this.VectorStoresService.retrieveVectorStoreFileBatch(vectorStoreId, batchId, options);
        }

        @ApiOperation({ summary: 'Cancel a vector store file batch' })
        @Post(':vectorStoreId/file-batches/:batchId/cancel')
        async cancelVectorStoreFileBatch(
            @Param('vectorStoreId') vectorStoreId: string,
            @Param('batchId') batchId: string,
            @Body() options?: RequestOptionsDto
        ) {
            return this.VectorStoresService.cancelVectorStoreFileBatch(vectorStoreId, batchId, options);
        }

        @ApiOperation({ summary: 'Create a file batch and poll until complete' })
        @Post(':vectorStoreId/file-batches/create-and-poll')
        async createFileBatchAndPoll(
            @Param('vectorStoreId') vectorStoreId: string,
            @Body() body: FileBatchCreateAndPollDto,
        ) {
            return this.VectorStoresService.createFileBatchAndPoll(vectorStoreId, body);
        }

        @ApiOperation({ summary: 'List all files in a vector store file batch' })
        @Get(':vectorStoreId/file-batches/:batchId/files')
        async listFilesInVectorStoreFileBatch(
            @Param('vectorStoreId') vectorStoreId: string,
            @Param('batchId') batchId: string,
            @Body() query: ListFilesInFileBatchDto,
        ) {
            return this.VectorStoresService.listFilesInVectorStoreFileBatch(vectorStoreId, batchId, query);
        }

        @ApiOperation({ summary: 'Poll the processing status of a file batch' })
        @Get(':vectorStoreId/file-batches/:batchId/poll')
        async pollFileBatch(
            @Param('vectorStoreId') vectorStoreId: string,
            @Param('batchId') batchId: string,
            @Body() options?: ExtendedRequestOptionsDto
        ) {
            return this.VectorStoresService.pollFileBatch(vectorStoreId, batchId, options);
        }

        @ApiOperation({ summary: 'Upload multiple files and poll until batch completes' })
        @Post(':vectorStoreId/file-batches/upload-and-poll')
        async uploadFileBatchAndPoll(
            @Param('vectorStoreId') vectorStoreId: string,
            @Body() payload: UploadFileBatchDto,
        ) {
            return this.VectorStoresService.uploadFileBatchAndPoll(vectorStoreId, payload);
        }
}
