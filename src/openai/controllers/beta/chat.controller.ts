import { Controller, Post, Body, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChatService } from '../../services/beta/chat.service'; // Assuming the service exists

@ApiTags('Beta - Chat')
@Controller('beta/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiOperation({ summary: 'Parse a chat completion' })
  @Post('completions/parse')
  parseChatCompletion(
    @Body() body: ParseChatCompletionDto, // Unique DTO for parsing chat completion
    @Query() options?: CoreRequestOptionsDto, // DTO for Core.RequestOptions
  ) {
    return this.chatService.parseChatCompletion(body, options);
  }

  @ApiOperation({ summary: 'Run tools for chat completion' })
  @Post('completions/run-tools')
  runTools(
    @Body() body: RunToolsDto, // DTO for ChatCompletionToolRunnerParams
    @Query() options?: RunnerOptionsDto, // DTO for RunnerOptions
  ) {
    return this.chatService.runTools(body, options);
  }

  @ApiOperation({ summary: 'Stream a chat completion' })
  @Post('completions/stream')
  streamChatCompletion(
    @Body() body: StreamChatCompletionDto, // DTO for ChatCompletionStreamParams
    @Query() options?: CoreRequestOptionsDto,
  ) {
    return this.chatService.streamChatCompletion(body, options);
  }
}
