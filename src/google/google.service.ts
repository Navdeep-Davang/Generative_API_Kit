import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI, EmbedContentResponse, BatchEmbedContentsResponse, ChatSession } from '@google/generative-ai';
import { GenerateContentDto } from './dto/GenerateContent/generate-content.dto';
import { GenerateContentStreamDto } from './dto/GenerateContentStream/generate-content-stream.dto';
import { StartChatDto } from './dto/StartChat/start-chat.dto';
import { CountTokensDto } from './dto/CountTokens/count-tokens.dto';
import { EmbedContentDto } from './dto/BmbedContent/embed-content.dto';
import { BatchEmbedContentsDto } from './dto/BatchEmbedContents/batch-embed-contents.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleService {
  private genAI: GoogleGenerativeAI;


  constructor(private configService: ConfigService) {
      const apiKey =  this.configService.get<string>('GOOGLE_GENERATIVEAI_API_KEY')
      
      if (!apiKey) {
        throw new Error('GOOGLE_GENERATIVEAI_API_KEY is not defined in the environment variables');
      }

      this.genAI = new GoogleGenerativeAI(apiKey) ;
  
    }
 

  async generateContent(generateContentDto: GenerateContentDto): Promise<string> {
    const {modelParams, requestOptions, request, singleRequestOptions} = generateContentDto
    const model = this.genAI.getGenerativeModel(modelParams, requestOptions);

    const result = await model.generateContent(request, singleRequestOptions);
    return result.response.text();
  }

  async generateContentStream(generateContentStreamDto: GenerateContentStreamDto): Promise<string> {
    const {modelParams, requestOptions, request, singleRequestOptions} = generateContentStreamDto
    const model = this.genAI.getGenerativeModel(modelParams, requestOptions);

    const result = await model.generateContentStream(request, singleRequestOptions);
    // Implement streaming handling here
    return 'Stream result here'; // Modify this based on how you handle streams
  }

  startChat(startChatDto: StartChatDto): ChatSession {
    const {modelParams, requestOptions, startChatParams} = startChatDto
    const model = this.genAI.getGenerativeModel(modelParams, requestOptions);
    return model.startChat(startChatParams);
  }

  async countTokens(countTokensDto: CountTokensDto): Promise<number> {
    const {modelParams, requestOptions, request, singleRequestOptions} = countTokensDto
    const model = this.genAI.getGenerativeModel(modelParams, requestOptions);
    const result = await model.countTokens(request, singleRequestOptions);
    return result.totalTokens;
  }

  async embedContent(embedContentDto: EmbedContentDto): Promise<EmbedContentResponse> {
    const {modelParams, requestOptions, request, singleRequestOptions} = embedContentDto
    const model = this.genAI.getGenerativeModel(modelParams, requestOptions);
    return model.embedContent(request, singleRequestOptions);
  }

  async batchEmbedContents(batchEmbedContentsDto: BatchEmbedContentsDto): Promise<BatchEmbedContentsResponse> {
    const {modelParams, requestOptions, batchEmbedContentRequest, singleRequestOptions} = batchEmbedContentsDto
    const model = this.genAI.getGenerativeModel(modelParams, requestOptions);
    return model.batchEmbedContents(batchEmbedContentRequest, singleRequestOptions);
  }
}
