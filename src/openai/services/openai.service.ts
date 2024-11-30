import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { CreateCompletionDto } from '../dto/openai/Completions/completions.dto';
import { CreateEmbeddingDto } from '../dto/openai/Embeddings/embeddings.dto';
import { CreateFileDto, ListFilesDto, WaitForProcessingDto } from '../dto/openai/Files/files.dto';
import { RequestOptionsDto } from '../dto/openai/RequestOptions/request-options.dto';
import { CreateImageVariationDto, EditImageDto, GenerateImageDto } from '../dto/openai/Images/images.dto';
import { CreateModerationDto, CreateTranscriptionDto, CreateTranslationDto, GenerateSpeechDto } from '../dto/openai/Audio/audio.dto';
import { CreateFineTuningJobDto, ListFineTuningJobCheckpointsDto, ListFineTuningJobEventsDto, ListFineTuningJobsDto } from '../dto/openai/FineTuning/finetuning.dto';
import { CreateBatchDto, ListBatchDto } from '../dto/openai/Batches/batches.dto';
import { CreateUploadDto } from '../dto/openai/Uploads/uploads.dto';

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
		const {body, options}= createTranscriptionDto
		return this.openai.audio.transcriptions.create(body, options);
	}

	createTranslation(createTranslationDto: CreateTranslationDto) {
		const {body, options}= createTranslationDto
		return this.openai.audio.translations.create(body, options);
	}

	generateSpeech(generateSpeechDto: GenerateSpeechDto) {
		const {body, options}= generateSpeechDto
		return this.openai.audio.speech.create(body, options);
	}

// Moderations 1 Service
	createModeration(createModerationDto: CreateModerationDto) {
		const {body, options}= createModerationDto
		return this.openai.moderations.create(body, options);
	}

// Models 3 Services
	retrieveModel(modelId: string, options?:RequestOptionsDto) {
		return this.openai.models.retrieve(modelId, options);
	}

	listModels(options?:RequestOptionsDto) {
		return this.openai.models.list(options);
	}

	deleteModel(modelId: string, options?:RequestOptionsDto) {
		return this.openai.models.del(modelId, options);
	}

  // Fine-tuning Jobs 6 Services
	createFineTuningJob(createFineTuningJobDto: CreateFineTuningJobDto) {
		const {body, options}= createFineTuningJobDto
		return this.openai.fineTuning.jobs.create(body, options);
	}

	retrieveFineTuningJob(jobId: string, options?:RequestOptionsDto) {
		return this.openai.fineTuning.jobs.retrieve(jobId, options);
	}

	listFineTuningJobs(listFineTuningJobsDto: ListFineTuningJobsDto) {
		const {query, options}= listFineTuningJobsDto
		return this.openai.fineTuning.jobs.list(query, options);
	}

	cancelFineTuningJob(jobId: string, options?:RequestOptionsDto) {
		return this.openai.fineTuning.jobs.cancel(jobId, options);
	}

	listFineTuningJobEvents(jobId: string, listFineTuningJobEventsDto: ListFineTuningJobEventsDto) {
		const {query, options}= listFineTuningJobEventsDto
		return this.openai.fineTuning.jobs.listEvents(jobId, query, options);
	}

	listFineTuningJobCheckpoints(jobId: string, listFineTuningJobCheckpointsDto: ListFineTuningJobCheckpointsDto) {
		const {query, options}= listFineTuningJobCheckpointsDto
		return this.openai.fineTuning.jobs.checkpoints.list(jobId, query, options);
	}

  // Batches 4 Services
	createBatch(createBatchDto: CreateBatchDto) {
		const {body, options}= createBatchDto
		return this.openai.batches.create(body, options);
	}

	retrieveBatch(batchId: string, options?:RequestOptionsDto) {
		return this.openai.batches.retrieve(batchId, options);
	}

	listBatches(listBatchDto: ListBatchDto) {
		const {query, options}= listBatchDto
		return this.openai.batches.list(query, options);
	}

	cancelBatch(batchId: string, options?:RequestOptionsDto) {
		return this.openai.batches.cancel(batchId, options);
	}

  // Uploads 4 Services
	createUpload(createUploadDto: CreateUploadDto) {
		const {body, options}= createUploadDto
		return this.openai.uploads.create(body, options);
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
