import { ParseChatCompletionDto } from '@/openai/dto/beta/chat/chat.dto';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Beta } from 'openai/resources'; // Assuming Beta is the SDK resource for chat completions

@Injectable()
export class ChatService {
  private openAIClient: OpenAI;
  private readonly chat;

  constructor() {
    this.openAIClient = new OpenAI({
      apiKey: 'your-api-key', // Use environment variables for API key or configuration
    });

    this.chat = new Beta(this.openAIClient).chat;
  }

  // Handling chat completion parsing
  parseChatCompletion(parseChatCompletionDto: ParseChatCompletionDto) {
    const {body, options}= parseChatCompletionDto
    return this.chat.completions.parse(body, options);
  }

  // Running tools for a chat completion
  runTools(runToolsDto: RunToolsDto) {
    const {body, options}= runToolsDto
    return this.chat.completions.runTools(body, options);
  }

  // Streaming chat completion
  streamChatCompletion(streamChatCompletionDto: StreamChatCompletionDto, options?: CoreRequestOptionsDto) {
    return this.chat.completions.stream(streamChatCompletionDto, options);
  }
}
