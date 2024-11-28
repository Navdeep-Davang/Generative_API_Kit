import { Controller, Post, Body, Param, Get, Query, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { VectorStoresService } from '../../services/beta/beta.service'; // Adjust path if necessary
 

@ApiTags('Beta - Vector Stores')
@Controller('beta/vector-stores')
export class VectorStoresController {
  constructor(private readonly VectorStoresService: VectorStoresService) {}

// VectorStores Endpoints
    @ApiOperation({ summary: 'Create a vector store' })
    @Post()
    createVectorStore(@Body() createVectorStoreDto: CreateVectorStoreDto) {
        return this.VectorStoresService.createVectorStore(createVectorStoreDto);
    }

    @ApiOperation({ summary: 'Retrieve a vector store' })
    @Get(':vectorStoreId')
    retrieveVectorStore(@Param('vectorStoreId') vectorStoreId: string) {
        return this.VectorStoresService.retrieveVectorStore(vectorStoreId);
    }

    @ApiOperation({ summary: 'Update a vector store' })
    @Post(':vectorStoreId')
    updateVectorStore(
        @Param('vectorStoreId') vectorStoreId: string,
        @Body() updateVectorStoreDto: UpdateVectorStoreDto,
    ) {
        return this.VectorStoresService.updateVectorStore(vectorStoreId, updateVectorStoreDto);
    }

    @ApiOperation({ summary: 'List all vector stores' })
    @Get()
    listVectorStores(@Query() query: ListVectorStoresDto) {
        return this.VectorStoresService.listVectorStores(query);
    }

    @ApiOperation({ summary: 'Delete a vector store' })
    @Delete(':vectorStoreId')
    deleteVectorStore(@Param('vectorStoreId') vectorStoreId: string) {
        return this.VectorStoresService.deleteVectorStore(vectorStoreId);
    }

    // VectorStores-Files Endpoints
        @ApiOperation({ summary: 'Create a vector store file' })
        @Post(':vectorStoreId/files')
        createVectorStoreFile(
            @Param('vectorStoreId') vectorStoreId: string,
            @Body() createVectorStoreFileDto: CreateVectorStoreFileDto,
        ) {
            return this.VectorStoresService.createVectorStoreFile(vectorStoreId, createVectorStoreFileDto);
        }

        @ApiOperation({ summary: 'Retrieve a vector store file' })
        @Get(':vectorStoreId/files/:fileId')
        retrieveVectorStoreFile(
            @Param('vectorStoreId') vectorStoreId: string,
            @Param('fileId') fileId: string,
        ) {
            return this.VectorStoresService.retrieveVectorStoreFile(vectorStoreId, fileId);
        }

        @ApiOperation({ summary: 'List all vector store files' })
        @Get(':vectorStoreId/files')
        listVectorStoreFiles(
            @Param('vectorStoreId') vectorStoreId: string,
            @Query() query: ListVectorStoreFilesDto,
        ) {
            return this.VectorStoresService.listVectorStoreFiles(vectorStoreId, query);
        }

        @ApiOperation({ summary: 'Delete a vector store file' })
        @Delete(':vectorStoreId/files/:fileId')
        deleteVectorStoreFile(
            @Param('vectorStoreId') vectorStoreId: string,
            @Param('fileId') fileId: string,
        ) {
            return this.VectorStoresService.deleteVectorStoreFile(vectorStoreId, fileId);
        }

        @ApiOperation({ summary: 'Create a vector store file and poll until complete' })
        @Post(':vectorStoreId/files/create-and-poll')
        createAndPoll(
            @Param('vectorStoreId') vectorStoreId: string,
            @Body() createAndPollDto: FileCreateParamsDto,
        ) {
            return this.VectorStoresService.createAndPoll(vectorStoreId, createAndPollDto);
        }

        @ApiOperation({ summary: 'Poll the processing status of a vector store file' })
        @Get(':vectorStoreId/files/:fileId/poll')
        poll(
            @Param('vectorStoreId') vectorStoreId: string,
            @Param('fileId') fileId: string,
            @Query('pollIntervalMs') pollIntervalMs?: number,
        ) {
            return this.VectorStoresService.poll(vectorStoreId, fileId, { pollIntervalMs });
        }

        @ApiOperation({ summary: 'Upload a file to a vector store' })
        @Post(':vectorStoreId/files/upload')
        upload(
            @Param('vectorStoreId') vectorStoreId: string,
            @Body() uploadDto: UploadFileDto,
        ) {
            return this.VectorStoresService.upload(vectorStoreId, uploadDto);
        }

        @ApiOperation({ summary: 'Upload a file to a vector store and poll until complete' })
        @Post(':vectorStoreId/files/upload-and-poll')
        uploadAndPoll(
            @Param('vectorStoreId') vectorStoreId: string,
            @Body() uploadAndPollDto: UploadFileDto,
        ) {
            return this.VectorStoresService.uploadAndPoll(vectorStoreId, uploadAndPollDto);
        }

    // VectorStores-FileBatch Endpoints
        @ApiOperation({ summary: 'Create a vector store file batch' })
        @Post(':vectorStoreId/file-batches')
        createVectorStoreFileBatch(
            @Param('vectorStoreId') vectorStoreId: string,
            @Body() createFileBatchDto: CreateFileBatchDto,
        ) {
            return this.VectorStoresService.createVectorStoreFileBatch(vectorStoreId, createFileBatchDto);
        }

        @ApiOperation({ summary: 'Retrieve a vector store file batch' })
        @Get(':vectorStoreId/file-batches/:batchId')
        retrieveVectorStoreFileBatch(
            @Param('vectorStoreId') vectorStoreId: string,
            @Param('batchId') batchId: string,
        ) {
            return this.VectorStoresService.retrieveVectorStoreFileBatch(vectorStoreId, batchId);
        }

        @ApiOperation({ summary: 'Cancel a vector store file batch' })
        @Post(':vectorStoreId/file-batches/:batchId/cancel')
        cancelVectorStoreFileBatch(
            @Param('vectorStoreId') vectorStoreId: string,
            @Param('batchId') batchId: string,
        ) {
            return this.VectorStoresService.cancelVectorStoreFileBatch(vectorStoreId, batchId);
        }

        @ApiOperation({ summary: 'Create a file batch and poll until complete' })
        @Post(':vectorStoreId/file-batches/create-and-poll')
        createFileBatchAndPoll(
            @Param('vectorStoreId') vectorStoreId: string,
            @Body() createBatchDto: FileBatchCreateParamsDto,
        ) {
            return this.VectorStoresService.createAndPoll(vectorStoreId, createBatchDto);
        }

        @ApiOperation({ summary: 'List all files in a vector store file batch' })
        @Get(':vectorStoreId/file-batches/:batchId/files')
        listFilesInVectorStoreFileBatch(
            @Param('vectorStoreId') vectorStoreId: string,
            @Param('batchId') batchId: string,
            @Query() query: ListFilesInFileBatchDto,
        ) {
            return this.VectorStoresService.listFilesInVectorStoreFileBatch(vectorStoreId, batchId, query);
        }

        @ApiOperation({ summary: 'Poll the processing status of a file batch' })
        @Get(':vectorStoreId/file-batches/:batchId/poll')
        pollFileBatch(
            @Param('vectorStoreId') vectorStoreId: string,
            @Param('batchId') batchId: string,
            @Query('pollIntervalMs') pollIntervalMs?: number,
        ) {
            return this.VectorStoresService.poll(vectorStoreId, batchId, { pollIntervalMs });
        }

        @ApiOperation({ summary: 'Upload multiple files and poll until batch completes' })
        @Post(':vectorStoreId/file-batches/upload-and-poll')
        uploadFilesAndPollBatch(
            @Param('vectorStoreId') vectorStoreId: string,
            @Body() uploadBatchDto: UploadBatchFilesDto,
        ) {
            return this.VectorStoresService.uploadAndPoll(vectorStoreId, uploadBatchDto);
        }
}
