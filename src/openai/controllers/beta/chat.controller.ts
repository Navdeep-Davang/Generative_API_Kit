import { Controller, Post, Body, Query, Sse } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChatService } from '../../services/beta/chat.service'; // Assuming the service exists
import { ParseChatCompletionDto, RunToolsDto, StreamChatCompletionDto } from '@/openai/dto/beta/chat/chat.dto';
import { ChatCompletionStreamingRunner } from 'openai/lib/ChatCompletionStreamingRunner';
import { Observable, of } from 'rxjs';

@ApiTags('Beta - Chat')
@Controller('beta/chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    private isStreaming(result: any): result is ChatCompletionStreamingRunner<any> {
        return result && typeof result.next === 'function';  // Assuming `.next()` is present on the Streaming Runner
    }

// Chat 3 Endpoisnts
    @ApiOperation({ summary: 'Parse a chat completion' })
    @Post('completions/parse')
    async parseChatCompletion(
        @Body() body: ParseChatCompletionDto, 
    ) {
        return this.chatService.parseChatCompletion(body);
    }

    @ApiOperation({ summary: 'Run tools for chat completion' })
    @Post('completions/run-tools')
    runTools(
        @Body() body: RunToolsDto,
    ): Observable<any> {
        const result = this.chatService.runTools(body);

        if (this.isStreaming(result)) {
            // Handle Streaming Case
            return new Observable((observer) => {
                (async () => {
                    try {
                        for await (const event of result) {
                            observer.next({ data: event });
                        }
                        observer.complete();
                    } catch (error) {
                        observer.error(error);
                    }
                })();
            });
        } else {
            // Non-streaming case (regular Promise or response)
            return of(result);  // Wrap the result in an Observable
        }
    }

    @ApiOperation({ summary: 'Stream a chat completion' })
    @Post('completions/stream')
    @Sse('stream')
    streamChatCompletion(@Body() body: StreamChatCompletionDto): Observable<unknown> {
      // Call the service to get the stream object
      const stream = this.chatService.streamChatCompletion(body);
  
      // Convert the stream directly into an observable and return it
      return new Observable<unknown>((observer) => {
        (async () => {
          try {
            // Iterate over the stream and emit each chunk as an event
            for await (const chunk of stream) {
              observer.next(chunk); // Push each chunk to the observer
            }
            observer.complete(); // Complete the observable stream
          } catch (error) {
            observer.error(error); // Emit an error if the stream fails
          }
        })();
      });
    }
}
