import { Controller, Post, Get, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCompletionDto } from '../dto/openai/Completions/completions.dto';
import { CreateEmbeddingDto } from '../dto/openai/Embeddings/embeddings.dto';
import { CreateFileDto, ListFilesDto, WaitForProcessingDto } from '../dto/openai/Files/files.dto';
import { OpenAIService } from '../services/openai.service';
import { RequestOptionsDto } from '../dto/openai/RequestOptions/request-options.dto';
import { CreateImageVariationDto, EditImageDto, GenerateImageDto } from '../dto/openai/Images/images.dto';
import { CreateModerationDto, CreateTranscriptionDto, CreateTranslationDto, GenerateSpeechDto } from '../dto/openai/Audio/audio.dto';
import { CreateFineTuningJobDto, ListFineTuningJobCheckpointsDto, ListFineTuningJobEventsDto, ListFineTuningJobsDto } from '../dto/openai/FineTuning/finetuning.dto';
import { CreateBatchDto, ListBatchDto } from '../dto/openai/Batches/batches.dto';
import { CreateUploadDto } from '../dto/openai/Uploads/uploads.dto';

@Controller('openai')
@ApiTags('OpenAI')
export class OpenAIController {
  constructor(private readonly openAIService: OpenAIService) {}
  
// Completions 1 Endpoint
  @Post('completions')
  @ApiOperation({ summary: 'Create a completion based on input prompts' })
  async createCompletion(@Body() body: CreateCompletionDto) {
    return this.openAIService.createCompletion(body);
  }
// Embeddings 1 Endpoint
  @Post('embeddings')
  @ApiOperation({ summary: 'Create embeddings for input text' })
  async createEmbedding(@Body() body: CreateEmbeddingDto) {
    return this.openAIService.createEmbedding(body);
  }

// Files 6 Endpoint
  @Post('files')
  @ApiOperation({ summary: 'Upload a file for processing' })
  async createFile(@Body() body: CreateFileDto) {
    return this.openAIService.createFile(body);
  }

  @Get('files/:fileId')
  @ApiOperation({ summary: 'Retrieve details of a specific file by ID' })
  async retrieveFile(
    @Param('fileId') fileId: string,  // Extract fileId from the URL
    @Body() options?: RequestOptionsDto   // Extract options from the body
  ) {
    return this.openAIService.retrieveFile(fileId, options);
  }

  @Get('files')
  @ApiOperation({ summary: 'List all uploaded files' })
  async listFiles(@Query() query: ListFilesDto) {
    return this.openAIService.listFiles(query);
  }

  @Delete('files/:fileId')
  @ApiOperation({ summary: 'Delete a file by ID' })
  async deleteFile(
    @Param('fileId') fileId: string,
    @Body() options?: RequestOptionsDto  
  ) {
      return this.openAIService.deleteFile(fileId, options);
  }

  @Get('files/:fileId/content')
  @ApiOperation({ summary: 'Retrieve the content of a specific file' })
  async getFileContent(
    @Param('fileId') fileId: string,
    @Body() options?: RequestOptionsDto  
  ) {
    return this.openAIService.getFileContent(fileId, options);
  }

  @Get('files/:fileId/processing')
  @ApiOperation({ summary: 'Wait for the file processing to complete' })
  async waitForProcessing(
    @Param('fileId') fileId: string,
    @Body() options: WaitForProcessingDto,  // Use the WaitForProcessingDto to validate query params
  )
   {
    return this.openAIService.waitForProcessing(fileId, options);
  }

// Image 3 Endpoints 
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

  @Post('images/generate')
  @ApiOperation({ summary: 'Generate an image from a text prompt' })
  async generateImage(@Body() body: GenerateImageDto) {
    return this.openAIService.generateImage(body);
  }



// Audio 3 Endpoints 
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

// Moderation 1 Endpoint
  @Post('moderations')
  @ApiOperation({ summary: 'Classify text or image inputs for harmful content' })
  async createModeration(@Body() body: CreateModerationDto) {
    return this.openAIService.createModeration(body);
  }


// Model 3 Endpoints
  @Get('models/:modelId')
  @ApiOperation({ summary: 'Retrieve information about a specific model' })
  async retrieveModel(
    @Param('modelId') modelId: string,
    @Body() options?: RequestOptionsDto
  ) {
    return this.openAIService.retrieveModel(modelId, options);
  }
  
  @Get('models')
  @ApiOperation({ summary: 'List all available models' })
  async listModels(@Body() options?: RequestOptionsDto) {
    return this.openAIService.listModels(options);
  }
  
  @Delete('models/:modelId')
  @ApiOperation({ summary: 'Delete a fine-tuned model' })
  async deleteModel(
    @Param('modelId') modelId: string,
    @Body() options?: RequestOptionsDto
  ) {
    return this.openAIService.deleteModel(modelId, options);
  }
  

// Finetunig Jobs 6 Endpoints
  @Post('fine-tuning/jobs')
  @ApiOperation({ summary: 'Create a new fine-tuning job' })
  async createFineTuningJob(@Body() body: CreateFineTuningJobDto) {
    return this.openAIService.createFineTuningJob(body);
  }
  
  @Get('fine-tuning/jobs/:jobId')
  @ApiOperation({ summary: 'Retrieve information about a fine-tuning job' })
  async retrieveFineTuningJob(
    @Param('jobId') jobId: string,
    @Body() options?: RequestOptionsDto
  ) {
    return this.openAIService.retrieveFineTuningJob(jobId, options);
  }
  
  @Get('fine-tuning/jobs')
  @ApiOperation({ summary: 'List all fine-tuning jobs' })
  async listFineTuningJobs(@Query() query: ListFineTuningJobsDto) {
    return this.openAIService.listFineTuningJobs(query);
  }
  
  @Post('fine-tuning/jobs/:jobId/cancel')
  @ApiOperation({ summary: 'Cancel a fine-tuning job' })
  async cancelFineTuningJob(
    @Param('jobId') jobId: string,
    @Body() options?: RequestOptionsDto
  ) {
    return this.openAIService.cancelFineTuningJob(jobId, options);
  }
  
  @Get('fine-tuning/jobs/:jobId/events')
  @ApiOperation({ summary: 'List events for a fine-tuning job' })
  async listFineTuningJobEvents(
    @Param('jobId') jobId: string,
    @Body() body: ListFineTuningJobEventsDto,
  ) {
    return this.openAIService.listFineTuningJobEvents(jobId, body);
  }
  
  @Get('fine-tuning/jobs/:jobId/checkpoints')
  @ApiOperation({ summary: 'List checkpoints for a fine-tuning job' })
  async listFineTuningJobCheckpoints(
    @Param('jobId') jobId: string,
    @Query() query: ListFineTuningJobCheckpointsDto,
  ) {
    return this.openAIService.listFineTuningJobCheckpoints(jobId, query);
  }
  
// Batches 4 Endpoints
  @Post('batches')
  @ApiOperation({ summary: 'Create and execute a batch from an uploaded file of requests' })
  async createBatch(@Body() body: CreateBatchDto) {
    return this.openAIService.createBatch(body);
  }

  @Get('batches/:batchId')
  @ApiOperation({ summary: 'Retrieve a batch by ID' })
  async getBatch(
    @Param('batchId') batchId: string,
    @Body() options?: RequestOptionsDto
  ) {
    return this.openAIService.retrieveBatch(batchId, options);
  }

  @Get('batches')
  @ApiOperation({ summary: 'List your organization\'s batches' })
  async listBatches(@Query() query: ListBatchDto) {
    return this.openAIService.listBatches(query);
  }

  @Post('batches/:batchId/cancel')
  @ApiOperation({ summary: 'Cancel an in-progress batch' })
  async cancelBatch(@Param('batchId') batchId: string, @Body() options?: RequestOptionsDto) {
    return this.openAIService.cancelBatch(batchId, options);
  }
  
// Uploads 4 Endpoint
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
