import { Controller, Post, Body, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChatService } from '../../services/beta/chat.service'; // Assuming the service exists
import { ParseChatCompletionDto, RunToolsDto, StreamChatCompletionDto } from '@/openai/dto/beta/chat/chat.dto';

@ApiTags('Beta - Chat')
@Controller('beta/chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

// Chat 3 Endpoisnts
    @ApiOperation({ summary: 'Parse a chat completion' })
    @Post('completions/parse')
    parseChatCompletion(
        @Body() body: ParseChatCompletionDto, 
    ) {
        return this.chatService.parseChatCompletion(body);
    }

    @ApiOperation({ summary: 'Run tools for chat completion' })
    @Post('completions/run-tools')
    runTools(
        @Body() body: RunToolsDto,
    ) {
        return this.chatService.runTools(body);
    }

    @ApiOperation({ summary: 'Stream a chat completion' })
    @Post('completions/stream')
    streamChatCompletion(
        @Body() body: StreamChatCompletionDto
    ) {
        return this.chatService.streamChatCompletion(body);
    }
}
