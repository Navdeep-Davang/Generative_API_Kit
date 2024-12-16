import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI, EmbedContentResponse, BatchEmbedContentsResponse, ChatSession } from '@google/generative-ai';
import { GenerateContentDto } from './dto/GenerateContent/generate-content.dto';
import { GenerateContentStreamDto } from './dto/GenerateContentStream/generate-content-stream.dto';
import { StartChatDto } from './dto/StartChat/start-chat.dto';
import { CountTokensDto } from './dto/CountTokens/count-tokens.dto';
import { EmbedContentDto } from './dto/BmbedContent/embed-content.dto';
import { BatchEmbedContentsDto } from './dto/BatchEmbedContents/batch-embed-contents.dto';

@Injectable()
export class GoogleService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error('API_KEY is not defined in the environment variables');
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateContent(generateContentDto: GenerateContentDto): Promise<string> {
    const {request, requestOptions} = generateContentDto
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(request, requestOptions);
    return result.response.text();
  }

  async generateContentStream(generateContentStreamDto: GenerateContentStreamDto): Promise<string> {
    const {request, requestOptions} = generateContentStreamDto
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContentStream(request, requestOptions);
    // Implement streaming handling here
    return 'Stream result here'; // Modify this based on how you handle streams
  }

  startChat(startChatDto: StartChatDto): ChatSession {
    const {startChatParams} = startChatDto
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    return model.startChat(startChatParams);
  }

  async countTokens(countTokensDto: CountTokensDto): Promise<number> {
    const {request, requestOptions} = countTokensDto
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.countTokens(request, requestOptions);
    return result.totalTokens;
  }

  async embedContent(embedContentDto: EmbedContentDto): Promise<EmbedContentResponse> {
    const {request, requestOptions} = embedContentDto
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    return model.embedContent(request, requestOptions);
  }

  async batchEmbedContents(batchEmbedContentsDto: BatchEmbedContentsDto): Promise<BatchEmbedContentsResponse> {
    const {batchEmbedContentRequest, requestOptions, modelID} = batchEmbedContentsDto
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    return model.batchEmbedContents(batchEmbedContentRequest, requestOptions);
  }
}
