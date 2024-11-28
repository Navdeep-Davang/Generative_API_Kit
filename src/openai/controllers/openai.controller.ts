import { Controller, Post, Get, Delete, Param, Body, Query } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BetaController } from './controller/beta.controller';

@Controller('openai')
@ApiTags('OpenAI')
export class OpenAIController {
  constructor(private readonly openAIService: OpenAIService) {}
  
// Completions Endpoint
  @Post('completions')
  @ApiOperation({ summary: 'Create a completion based on input prompts' })
  async createCompletion(@Body() body: CreateCompletionDto) {
    return this.openAIService.createCompletion(body);
  }
// Embeddings Endpoint
  @Post('embeddings')
  @ApiOperation({ summary: 'Create embeddings for input text' })
  async createEmbedding(@Body() body: CreateEmbeddingDto) {
    return this.openAIService.createEmbedding(body);
  }

// Files Endpoint
  @Post('files')
  @ApiOperation({ summary: 'Upload a file for processing' })
  async createFile(@Body() body: CreateFileDto) {
    return this.openAIService.createFile(body);
  }

  @Get('files/:fileId')
  @ApiOperation({ summary: 'Retrieve details of a specific file by ID' })
  async retrieveFile(@Param('fileId') fileId: string) {
    return this.openAIService.retrieveFile(fileId);
  }

  @Get('files')
  @ApiOperation({ summary: 'List all uploaded files' })
  async listFiles(@Query() query: ListFilesDto) {
    return this.openAIService.listFiles(query);
  }

  @Delete('files/:fileId')
  @ApiOperation({ summary: 'Delete a file by ID' })
  async deleteFile(@Param('fileId') fileId: string) {
    return this.openAIService.deleteFile(fileId);
  }

  @Get('files/:fileId/content')
  @ApiOperation({ summary: 'Retrieve the content of a specific file' })
  async getFileContent(@Param('fileId') fileId: string) {
    return this.openAIService.getFileContent(fileId);
  }

// Image Endpoints 
  @Post('images/generate')
  @ApiOperation({ summary: 'Generate an image from a text prompt' })
  async generateImage(@Body() body: GenerateImageDto) {
    return this.openAIService.generateImage(body);
  }

  @Post('images/variations')
  @ApiOperation({ summary: 'Create variations of an existing image' })
  async createImageVariation(@Body() body: CreateImageVariationDto) {
    return this.openAIService.createImageVariation(body);
  }

  @Post('images/edit')
  @ApiOperation({ summary: 'Edit an image based on input prompts' })
  async editImage(@Body() body: EditImageDto) {
    return this.openAIService.editImage(body);
  }

// Audio Endpoints 
  @Post('audio/transcriptions')
  @ApiOperation({ summary: 'Transcribe audio into text' })
  async createTranscription(@Body() body: CreateTranscriptionDto) {
    return this.openAIService.createTranscription(body);
  }

  @Post('audio/translations')
  @ApiOperation({ summary: 'Translate audio into English' })
  async createTranslation(@Body() body: CreateTranslationDto) {
    return this.openAIService.createTranslation(body);
  }

  @Post('audio/speech')
  @ApiOperation({ summary: 'Generate speech from text' })
  async generateSpeech(@Body() body: GenerateSpeechDto) {
    return this.openAIService.generateSpeech(body);
  }

// Moderation Endpoint
  @Post('moderations')
  @ApiOperation({ summary: 'Classify text or image inputs for harmful content' })
  async createModeration(@Body() body: CreateModerationDto) {
    return this.openAIService.createModeration(body);
  }


// Model Endpoints
  @Get('models/:modelId')
  @ApiOperation({ summary: 'Retrieve information about a specific model' })
  async retrieveModel(@Param('modelId') modelId: string) {
    return this.openAIService.retrieveModel(modelId);
  }
  
  @Get('models')
  @ApiOperation({ summary: 'List all available models' })
  async listModels() {
    return this.openAIService.listModels();
  }
  
  @Delete('models/:modelId')
  @ApiOperation({ summary: 'Delete a fine-tuned model' })
  async deleteModel(@Param('modelId') modelId: string) {
    return this.openAIService.deleteModel(modelId);
  }
  

// Finetunig Endpoints
  @Post('fine-tuning/jobs')
  @ApiOperation({ summary: 'Create a new fine-tuning job' })
  async createFineTuningJob(@Body() body: CreateFineTuningJobDto) {
    return this.openAIService.createFineTuningJob(body);
  }
  
  @Get('fine-tuning/jobs/:jobId')
  @ApiOperation({ summary: 'Retrieve information about a fine-tuning job' })
  async retrieveFineTuningJob(@Param('jobId') jobId: string) {
    return this.openAIService.retrieveFineTuningJob(jobId);
  }
  
  @Get('fine-tuning/jobs')
  @ApiOperation({ summary: 'List all fine-tuning jobs' })
  async listFineTuningJobs(@Query() query: ListFineTuningJobsDto) {
    return this.openAIService.listFineTuningJobs(query);
  }
  
  @Post('fine-tuning/jobs/:jobId/cancel')
  @ApiOperation({ summary: 'Cancel a fine-tuning job' })
  async cancelFineTuningJob(@Param('jobId') jobId: string) {
    return this.openAIService.cancelFineTuningJob(jobId);
  }
  
  @Get('fine-tuning/jobs/:jobId/events')
  @ApiOperation({ summary: 'List events for a fine-tuning job' })
  async listFineTuningJobEvents(
    @Param('jobId') jobId: string,
    @Query() query: ListFineTuningJobEventsDto,
  ) {
    return this.openAIService.listFineTuningJobEvents(jobId, query);
  }
  
  @Get('fine-tuning/jobs/:jobId/checkpoints')
  @ApiOperation({ summary: 'List checkpoints for a fine-tuning job' })
  async listFineTuningJobCheckpoints(
    @Param('jobId') jobId: string,
    @Query() query: ListFineTuningJobCheckpointsDto,
  ) {
    return this.openAIService.listFineTuningJobCheckpoints(jobId, query);
  }
  
// Batches Endpoints
  @Post('batches')
  @ApiOperation({ summary: 'Create and execute a batch from an uploaded file of requests' })
  async createBatch(@Body() body: CreateBatchDto) {
    return this.openAIService.createBatch(body);
  }

  @Get('batches/:batchId')
  @ApiOperation({ summary: 'Retrieve a batch by ID' })
  async getBatch(@Param('batchId') batchId: string) {
    return this.openAIService.retrieveBatch(batchId);
  }

  @Get('batches')
  @ApiOperation({ summary: 'List your organization\'s batches' })
  async listBatches(@Query() query: ListBatchDto) {
    return this.openAIService.listBatches(query);
  }

  @Post('batches/:batchId/cancel')
  @ApiOperation({ summary: 'Cancel an in-progress batch' })
  async cancelBatch(@Param('batchId') batchId: string, @Body() body: CancelBatchDto) {
    return this.openAIService.cancelBatch(batchId, body);
  }
  
// Uploads Endpoint
  @Post('uploads')
  @ApiOperation({ summary: 'Create an upload object for file parts' })
  async createUpload(@Body() body: CreateUploadDto) {
    return this.openAIService.createUpload(body);
  }

  @Post('uploads/:uploadId/cancel')
  @ApiOperation({ summary: 'Cancel an ongoing upload' })
  async cancelUpload(@Param('uploadId') uploadId: string, @Body() body: CancelUploadDto) {
    return this.openAIService.cancelUpload(uploadId, body);
  }

  @Post('uploads/:uploadId/complete')
  @ApiOperation({ summary: 'Complete the upload and create a file' })
  async completeUpload(@Param('uploadId') uploadId: string, @Body() body: CompleteUploadDto) {
    return this.openAIService.completeUpload(uploadId, body);
  }

  @Post('uploads/:uploadId/parts')
  @ApiOperation({ summary: 'Add a part to the upload' })
  async createPart(@Param('uploadId') uploadId: string, @Body() body: CreatePartDto) {
    return this.openAIService.createPart(uploadId, body);
  }

}
