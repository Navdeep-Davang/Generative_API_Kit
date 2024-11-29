import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { CreateCompletionDto } from '../dto/openai/Completions/completions.dto';
import { CompletionCreateParamsNonStreaming, CompletionCreateParamsStreaming } from 'openai/resources';
import { CreateEmbeddingDto } from '../dto/openai/Embeddings/embeddings.dto';
import { CreateFileDto, ListFilesDto, WaitForProcessingDto } from '../dto/openai/Files/files.dto';
import { RequestOptionsDto } from '../dto/openai/RequestOptions/request-options.dto';
import { CreateImageVariationDto, EditImageDto, GenerateImageDto } from '../dto/openai/Images/images.dto';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

// Completions 1 Service
	createCompletion(createCompletionDto: CreateCompletionDto) {
		const {body, options}= createCompletionDto		 
		return this.openai.completions.create(body, options);
	}

// Embeddings 1 Service
	createEmbedding(createEmbeddingDto: CreateEmbeddingDto) {
		const {body, options}= createEmbeddingDto	
		return this.openai.embeddings.create(body, options);
	}

// Files 6 Services
	createFile(createFileDto: CreateFileDto) {
		const {body, options}= createFileDto
		return this.openai.files.create(body, options);
	}

	retrieveFile(fileId: string, options?:RequestOptionsDto) {
		return this.openai.files.retrieve(fileId, options);
	}

	listFiles(query: ListFilesDto) {
		return this.openai.files.list(query);
	}

	deleteFile(fileId: string, options?:RequestOptionsDto) {
		return this.openai.files.del(fileId, options);
	}

	getFileContent(fileId: string, options?:RequestOptionsDto) {
		return this.openai.files.content(fileId, options);
	}

	waitForProcessing(fileId: string , options: WaitForProcessingDto) {
		return this.openai.files.waitForProcessing(fileId, options);
	}

// Images 3 Services
	createImageVariation(createImageVariationDto: CreateImageVariationDto) {
		const {body, options}= createImageVariationDto	
		return this.openai.images.createVariation(body, options);
	}

	editImage(editImageDto: EditImageDto) {
		const {body, options}= editImageDto
		return this.openai.images.edit(body, options);
	}

	generateImage(generateImageDto: GenerateImageDto) {
		const {body, options}= generateImageDto
		return this.openai.images.generate(body, options);
	}	

// Audio 3 Services
	createTranscription(createTranscriptionDto: CreateTranscriptionDto) {
		return this.openai.audio.transcriptions.create(createTranscriptionDto);
	}

	createTranslation(createTranslationDto: CreateTranslationDto) {
		return this.openai.audio.translations.create(createTranslationDto);
	}

	generateSpeech(generateSpeechDto: GenerateSpeechDto) {
		return this.openai.audio.speech.create(generateSpeechDto);
	}

// Moderations 1 Service
	createModeration(createModerationDto: CreateModerationDto) {
		return this.openai.moderations.create(createModerationDto);
	}

// Models 3 Services
	retrieveModel(modelId: string) {
		return this.openai.models.retrieve(modelId);
	}

	listModels() {
		return this.openai.models.list();
	}

	deleteModel(modelId: string) {
		return this.openai.models.del(modelId);
	}

  // Fine-tuning Jobs 6 Services
	createFineTuningJob(createFineTuningJobDto: CreateFineTuningJobDto) {
		return this.openai.fineTuning.jobs.create(createFineTuningJobDto);
	}

	retrieveFineTuningJob(jobId: string) {
		return this.openai.fineTuning.jobs.retrieve(jobId);
	}

	listFineTuningJobs(query: ListFineTuningJobsDto) {
		return this.openai.fineTuning.jobs.list(query);
	}

	cancelFineTuningJob(jobId: string) {
		return this.openai.fineTuning.jobs.cancel(jobId);
	}

	listFineTuningJobEvents(jobId: string, query: ListFineTuningJobEventsDto) {
		return this.openai.fineTuning.jobs.listEvents(jobId, query);
	}

	listFineTuningJobCheckpoints(jobId: string, query: ListFineTuningJobCheckpointsDto) {
		return this.openai.fineTuning.jobs.checkpoints.list(jobId, query);
	}

  // Batches 4 Services
	createBatch(createBatchDto: CreateBatchDto) {
		return this.openai.batches.create(createBatchDto);
	}

	retrieveBatch(batchId: string) {
		return this.openai.batches.retrieve(batchId);
	}

	listBatches(query: ListBatchDto) {
		return this.openai.batches.list(query);
	}

	cancelBatch(batchId: string, cancelBatchDto: CancelBatchDto) {
		return this.openai.batches.cancel(batchId, cancelBatchDto);
	}

  // Uploads 4 Services
	createUpload(createUploadDto: CreateUploadDto) {
		return this.openai.uploads.create(createUploadDto);
	}

	cancelUpload(uploadId: string, cancelUploadDto: CancelUploadDto) {
		return this.openai.uploads.cancel(uploadId, cancelUploadDto);
	}

	completeUpload(uploadId: string, completeUploadDto: CompleteUploadDto) {
		return this.openai.uploads.complete(uploadId, completeUploadDto);
	}

	createPart(uploadId: string, createPartDto: CreatePartDto) {
		return this.openai.uploads.parts.create(uploadId, createPartDto);
	}
}
