import { Controller, Post, Body, Sse, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { GoogleService } from './google.service';
import { GenerateContentDto } from './dto/GenerateContent/generate-content.dto';
import { GenerateContentStreamDto } from './dto/GenerateContentStream/generate-content-stream.dto';
import { StartChatDto } from './dto/StartChat/start-chat.dto';
import { CountTokensDto } from './dto/CountTokens/count-tokens.dto';
import { EmbedContentDto } from './dto/BmbedContent/embed-content.dto';
import { BatchEmbedContentsDto } from './dto/BatchEmbedContents/batch-embed-contents.dto';
import { ChatSession, EmbedContentResponse, BatchEmbedContentsResponse } from '@google/generative-ai';
import { Observable } from 'rxjs';

@UsePipes(ZodValidationPipe) 
@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Post('generate-content')
  async generateContent(@Body() generateContentDto: GenerateContentDto): Promise<string> {
    return this.googleService.generateContent(generateContentDto);
  }

  @Sse('generate-content-stream')
  generateContentStream(@Body() generateContentStreamDto: GenerateContentStreamDto): Observable<any> {
    return new Observable((subscriber) => {
      this.googleService.generateContentStream(generateContentStreamDto)
        .then((stream) => {
          subscriber.next({ data: stream });  // Keep this as an object with "data" key
          subscriber.complete();
        })
        .catch((error) => {
          subscriber.error(error);
        });
    });
  }

  @Post('start-chat')
  startChat(@Body() startChatDto: StartChatDto): ChatSession {
    return this.googleService.startChat(startChatDto);
  }

  @Post('count-tokens')
  async countTokens(@Body() countTokensDto: CountTokensDto): Promise<number> {
    return this.googleService.countTokens(countTokensDto);
  }

  @Post('embed-content')
  async embedContent(@Body() embedContentDto: EmbedContentDto): Promise<EmbedContentResponse> {
    return this.googleService.embedContent(embedContentDto);
  }

  @Post('batch-embed-contents')
  async batchEmbedContents(@Body() batchEmbedContentsDto: BatchEmbedContentsDto): Promise<BatchEmbedContentsResponse> {
    return this.googleService.batchEmbedContents(batchEmbedContentsDto);
  }
}
