import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI, EmbedContentResponse, BatchEmbedContentsResponse, ChatSession } from '@google/generative-ai';
import { GenerateContentDto, GenerateContentStreamDto, StartChatDto, CountTokensDto, EmbedContentDto, BatchEmbedContentsDto } from './dto';
import * as fs from 'fs';

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

  async generateContent(dto: GenerateContentDto): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const image = dto.imagePath
      ? {
          inlineData: {
            data: Buffer.from(fs.readFileSync(dto.imagePath)).toString('base64'),
            mimeType: 'image/png',
          },
        }
      : undefined;

    const result = await model.generateContent([dto.prompt, image]);
    return result.response.text();
  }

  async generateContentStream(dto: GenerateContentStreamDto): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContentStream(dto.request, dto.requestOptions);
    // Implement streaming handling here
    return 'Stream result here'; // Modify this based on how you handle streams
  }

  startChat(dto: StartChatDto): ChatSession {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    return model.startChat(dto.startChatParams);
  }

  async countTokens(dto: CountTokensDto): Promise<number> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.countTokens(dto.request, dto.requestOptions);
    return result.totalTokens;
  }

  async embedContent(dto: EmbedContentDto): Promise<EmbedContentResponse> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    return model.embedContent(dto.request, dto.requestOptions);
  }

  async batchEmbedContents(dto: BatchEmbedContentsDto): Promise<BatchEmbedContentsResponse> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    return model.batchEmbedContents(dto.batchEmbedContentRequest, dto.requestOptions);
  }
}
