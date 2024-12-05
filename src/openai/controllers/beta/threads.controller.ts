import { ExtendedRequestOptionsDto, ListRunParamsDto, MessageCreateDto, MessageListQueryDto, MessageUpdateDto, RunCreateAndPollDto, RunCreateDto, RunStreamDto, RunSubmitToolOutputsDto, RunSubmitToolOutputsPollDto, RunSubmitToolOutputsStreamDto, RunUpdateDto, StepListQueryDto, StepRetrieveQueryDto, ThreadCreateAndRunDto, ThreadCreateAndRunPollDto, ThreadCreateAndRunStreamDto, ThreadCreateDto, ThreadUpdateDto } from '@/openai/dto/beta/threads/threads.dto';
import { RequestOptionsDto } from '@/openai/dto/openai/RequestOptions/request-options.dto';
import { ThreadsService } from '@/openai/services/beta/threads.service';
import { Controller, Post, Get, Delete, Body, Param, Query, Sse } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AssistantStreamEvent } from 'openai/resources/beta/assistants';
import { Stream } from 'openai/streaming';
import { Observable, of } from 'rxjs';

@ApiTags('Beta - Threads')
@Controller('beta/threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  private isStream(
    result: any
  ): result is Stream<AssistantStreamEvent> {
    return (
      result &&
      typeof result[Symbol.asyncIterator] === 'function'
    );
  }

// Threads 7 Endpoints
    @Post()
    @ApiOperation({ summary: 'Create a thread' })
    async createThread(@Body() body: ThreadCreateDto) {
    return this.threadsService.createThread(body);
    }

    @Get(':threadId')
    @ApiOperation({ summary: 'Retrieve a thread by ID' })
    async retrieveThread(
        @Param('threadId') threadId: string,
        @Body() options?: RequestOptionsDto
    ) {
    return this.threadsService.retrieveThread(threadId, options);
    }

    @Post(':threadId')
    @ApiOperation({ summary: 'Update a thread by ID' })
    async updateThread(
        @Param('threadId') threadId: string,
        @Body() body: ThreadUpdateDto
    ) {
    return this.threadsService.updateThread(threadId, body);
    }

    @Delete(':threadId')
    @ApiOperation({ summary: 'Delete a thread by ID' })
    async deleteThread(
        @Param('threadId') threadId: string,
        @Body() options?: RequestOptionsDto
    ) {
    return this.threadsService.deleteThread(threadId, options);
    }

    @Post('run')
    @ApiOperation({ summary: 'Create a thread and run it in one request' })
    async createAndRunThread(@Body() body: ThreadCreateAndRunDto) {
    return this.threadsService.createAndRunThread(body);
    }

    @Post('run/poll')
    @ApiOperation({ summary: 'Create a thread, run it and poll for a terminal state' })
    async createAndRunPollThread(@Body() body: ThreadCreateAndRunPollDto) {
    return this.threadsService.createAndRunPollThread(body);
    }

    @Post('run/stream')
    @ApiOperation({ summary: 'Create a thread and stream the run back' })
    async createAndRunStreamThread(@Body() body: ThreadCreateAndRunStreamDto) {
    return this.threadsService.createAndRunStreamThread(body);
    }

    
    // Runs 11  Endpoints
        @Post(':threadId/runs')
        @ApiOperation({ summary: 'Create a run for a thread' })
        async createRunForThread(
            @Param('threadId') threadId: string,
            @Body() body: RunCreateDto
        ) {
            return this.threadsService.createRunForThread(threadId, body);
        }

        @Get(':threadId/runs/:runId')
        @ApiOperation({ summary: 'Retrieve a run by ID' })
        async retrieveRunForThread(
            @Param('threadId') threadId: string,
            @Param('runId') runId: string,
            @Body() options?: RequestOptionsDto
        ) {
            return this.threadsService.retrieveRunForThread(threadId, runId, options);
        }

        @Post(':threadId/runs/:runId')
        @ApiOperation({ summary: 'Update a run by ID' })
        async updateRunForThread(
            @Param('threadId') threadId: string,
            @Param('runId') runId: string,
            @Body() body: RunUpdateDto
        ) {
            return this.threadsService.updateRunForThread(threadId, runId, body);
        }

        @Get(':threadId/runs')
        @ApiOperation({ summary: 'List runs for a thread' })
        async listRunsForThread(
            @Param('threadId') threadId: string, 
            @Body() body: ListRunParamsDto
        ) {
            return this.threadsService.listRunsForThread(threadId, body);
        }

        @Post(':threadId/runs/:runId/cancel')
        @ApiOperation({ summary: 'Cancel a run that is in progress' })
        async cancelRunForThread(
            @Param('threadId') threadId: string,
            @Param('runId') runId: string,
            @Body() options?: RequestOptionsDto
        ) {
            return this.threadsService.cancelRunForThread(threadId, runId, options);
        }

        @Post(':threadId/runs/poll')
        @ApiOperation({ summary: 'Create a run and poll for a terminal state' })
        async createAndPollRunForThread(
            @Param('threadId') threadId: string,
            @Body() body: RunCreateAndPollDto
        ) {
            return this.threadsService.createAndPollRunForThread(threadId, body);
        }

        @Post(':threadId/:runId/poll')
        @ApiOperation({ summary: 'Poll the status of a run in a thread' })
        async pollRunForThread(
            @Param('threadId') threadId: string,
            @Param('runId') runId: string,
            @Body() options?:ExtendedRequestOptionsDto,
        ) {
            return this.threadsService.pollRunForThread(threadId, runId, options);
        }

        @Post(':threadId/runs/stream')
        @Sse()
        @ApiOperation({ summary: 'Create a run stream' })
        streamRunForThread(
            @Param('threadId') threadId: string,
            @Body() body: RunStreamDto,
        ): Observable<any>  {
            const assistantStream = this.threadsService.streamRunForThread(threadId, body);
            
            return new Observable((observer) => {
                assistantStream.on('event', (event) => {
                  observer.next({ data: event });
                });
          
                assistantStream.on('end', () => {
                  observer.complete();
                });
          
                assistantStream.on('error', (err) => {
                  observer.error(err);
                });
              });
        }

        
        @Post(':threadId/runs/:runId/submit_tool_outputs')
        @ApiOperation({ summary: 'Submit tool outputs for a run' })
        @Sse()
        submitToolOutputsForRun(
          @Param('threadId') threadId: string,
          @Param('runId') runId: string,
          @Body() body: RunSubmitToolOutputsDto,
        ): Observable<any> {
          // Call the service to get the result, which could be a stream or non-stream data
          const result = this.threadsService.submitToolOutputsForRun(threadId, runId, body);

          // Check if result is a stream and handle accordingly
          if (this.isStream(result)) {
            // Streaming case
            return new Observable((observer) => {
              (async () => {
                try {
                  for await (const event of result) {
                    observer.next({ data: event }); // Emit each event as an SSE chunk
                  }
                  observer.complete(); // Complete the observable stream
                } catch (error) {
                  observer.error(error); // Handle errors in the stream
                }
              })();
            });
          } else {
            // Non-streaming case, wrap the result in an Observable and return
            return of(result);
          }
        }
        
        @Post(':threadId/runs/:runId/submit_tool_outputs/poll')
        @ApiOperation({ summary: 'Submit tool outputs and poll for a terminal run state' })
        async submitToolOutputsAndPollForRun(
            @Param('threadId') threadId: string,
            @Param('runId') runId: string,
            @Body() body: RunSubmitToolOutputsPollDto
        ) {
            return this.threadsService.submitToolOutputsAndPollForRun(threadId, runId, body);
        }

        @Post(':threadId/runs/:runId/submit_tool_outputs/stream')
        @Sse()
        @ApiOperation({ summary: 'Submit tool outputs and stream the run' })
        submitToolOutputsStreamForRun(
            @Param('threadId') threadId: string,
            @Param('runId') runId: string,
            @Body() body: RunSubmitToolOutputsStreamDto) {
            const assistantStream = this.threadsService.submitToolOutputsStreamForRun(threadId, runId, body);
            
            return new Observable((observer) => {
                assistantStream.on('event', (event) => {
                  observer.next({ data: event });
                });
          
                assistantStream.on('end', () => {
                  observer.complete();
                });
          
                assistantStream.on('error', (err) => {
                  observer.error(err);
                });
              });
        }

        // Steps 2 Endpoints
            @Get(':threadId/runs/:runId/steps/:stepId')
            @ApiOperation({ summary: 'Retrieve a specific run step' })
            async retrieveRunStepForThread(
                @Param('threadId') threadId: string,
                @Param('runId') runId: string,
                @Param('stepId') stepId: string,
                @Body() query: StepRetrieveQueryDto,
            ) {
            return this.threadsService.retrieveRunStepForThread(threadId, runId, stepId, query);
            }

            @Get(':threadId/runs/:runId/steps')
            @ApiOperation({ summary: 'List all steps for a specific run' })
            async listRunStepsForThread(
                @Param('threadId') threadId: string,
                @Param('runId') runId: string,
                @Body() query: StepListQueryDto,
            ) {
            return this.threadsService.listRunStepsForThread(threadId, runId, query);
            }
        
    // Messages 5 Endpoints
        @Post(':threadId/messages')
        @ApiOperation({ summary: 'Create a message for a thread' })
        async createMessageForThread(
            @Param('threadId') threadId: string, 
            @Body() body: MessageCreateDto
        ) {
            return this.threadsService.createMessageForThread(threadId, body);
        }
    
        @Get(':threadId/messages/:messageId')
        @ApiOperation({ summary: 'Retrieve a specific message' })
        async retrieveMessageForThread(
            @Param('threadId') threadId: string,
            @Param('messageId') messageId: string,
            @Body() options?: RequestOptionsDto
        ) {
            return this.threadsService.retrieveMessageForThread(threadId, messageId, options);
        }
    
        @Post(':threadId/messages/:messageId')
        @ApiOperation({ summary: 'Update a specific message' })
        async updateMessageForThread(
            @Param('threadId') threadId: string,
            @Param('messageId') messageId: string,
            @Body() body: MessageUpdateDto
        ) {
            return this.threadsService.updateMessageForThread(threadId, messageId, body);
        }
    
        @Get(':threadId/messages')
        @ApiOperation({ summary: 'List all messages for a thread' })
        async listMessagesForThread(
            @Param('threadId') threadId: string, 
            @Body() query: MessageListQueryDto
        ) {
            return this.threadsService.listMessagesForThread(threadId, query);
        }
    
        @Delete(':threadId/messages/:messageId')
        @ApiOperation({ summary: 'Delete a specific message' })
        async deleteMessageForThread(
            @Param('threadId') threadId: string,
            @Param('messageId') messageId: string,
            @Body() options?: RequestOptionsDto
        ) {
            return this.threadsService.deleteMessageForThread(threadId, messageId, options);
        }

}
