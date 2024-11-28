import { Controller, Post, Get, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Beta - Threads')
@Controller('beta/threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

// Threads Endpoints
    @Post()
    @ApiOperation({ summary: 'Create a thread' })
    create(@Body() body: ThreadCreateDto) {
    return this.threadsService.create(body);
    }

    @Get(':threadId')
    @ApiOperation({ summary: 'Retrieve a thread by ID' })
    retrieve(@Param() params: ThreadIdDto) {
    return this.threadsService.retrieve(params.threadId);
    }

    @Post(':threadId')
    @ApiOperation({ summary: 'Update a thread by ID' })
    update(
    @Param() params: ThreadIdDto,
    @Body() body: ThreadUpdateDto
    ) {
    return this.threadsService.update(params.threadId, body);
    }

    @Delete(':threadId')
    @ApiOperation({ summary: 'Delete a thread by ID' })
    delete(@Param() params: ThreadIdDto) {
    return this.threadsService.del(params.threadId);
    }

    @Post('run')
    @ApiOperation({ summary: 'Create a thread and run it in one request' })
    createAndRun(@Body() body: ThreadCreateAndRunDto) {
    return this.threadsService.createAndRun(body);
    }

    @Post('run/poll')
    @ApiOperation({ summary: 'Create a thread, run it and poll for a terminal state' })
    createAndRunPoll(@Body() body: ThreadCreateAndRunPollDto) {
    return this.threadsService.createAndRunPoll(body);
    }

    @Post('run/stream')
    @ApiOperation({ summary: 'Create a thread and stream the run back' })
    createAndRunStream(@Body() body: ThreadCreateAndRunStreamDto) {
    return this.threadsService.createAndRunStream(body);
    }

    
    // Runs Endpoints
        @Post(':threadId/runs')
        @ApiOperation({ summary: 'Create a run for a thread' })
        createRun(@Param('threadId') threadId: string, @Body() body: RunCreateDto) {
            return this.threadsService.createRun(threadId, body);
        }

        @Get(':threadId/runs/:runId')
        @ApiOperation({ summary: 'Retrieve a run by ID' })
        retrieveThreadRun(@Param() params: RunIdDto) {
            return this.threadsService.retrieveThreadRun(params.threadId, params.runId);
        }

        @Post(':threadId/runs/:runId')
        @ApiOperation({ summary: 'Update a run by ID' })
        updateThreadRun(
            @Param() params: RunIdDto,
            @Body() body: RunUpdateDto
        ) {
            return this.threadsService.updateThreadRun(params.threadId, params.runId, body);
        }

        @Get(':threadId/runs')
        @ApiOperation({ summary: 'List runs for a thread' })
        listThreadRuns(@Param('threadId') threadId: string, @Body() query: RunListParamsDto) {
            return this.threadsService.listThreadRuns(threadId, query);
        }

        @Post(':threadId/runs/:runId/cancel')
        @ApiOperation({ summary: 'Cancel a run that is in progress' })
        cancelThreadRun(@Param() params: RunIdDto) {
            return this.threadsService.cancelThreadRun(params.threadId, params.runId);
        }

        @Post(':threadId/runs/poll')
        @ApiOperation({ summary: 'Create a run and poll for a terminal state' })
        createAndPollThreadRun(@Param('threadId') threadId: string, @Body() body: RunCreateAndPollDto) {
            return this.threadsService.createAndPollThreadRun(threadId, body);
        }

        @Post(':threadId/:runId/poll')
        @ApiOperation({ summary: 'Poll the status of a run in a thread' })
        async pollThreadRun(
            @Param('threadId') threadId: string,
            @Param('runId') runId: string,
            @Body() options?: Core.RequestOptions & { pollIntervalMs?: number },
        ): Promise<Run> {
            return this.threadsService.pollThreadRun(threadId, runId, options);
        }

        @Post(':threadId/runs/stream')
        @ApiOperation({ summary: 'Create a run stream' })
        streamThreadRun(@Param('threadId') threadId: string, @Body() body: RunStreamDto) {
            return this.threadsService.streamThreadRun(threadId, body);
        }

        @Post(':threadId/runs/:runId/submit_tool_outputs')
        @ApiOperation({ summary: 'Submit tool outputs for a run' })
        submitToolOutputsThreadRun(@Param() params: RunIdDto, @Body() body: RunSubmitToolOutputsDto) {
            return this.threadsService.submitToolOutputsThreadRun(params.threadId, params.runId, body);
        }

        @Post(':threadId/runs/:runId/submit_tool_outputs/poll')
        @ApiOperation({ summary: 'Submit tool outputs and poll for a terminal run state' })
        submitToolOutputsAndPollThreadRun(@Param() params: RunIdDto, @Body() body: RunSubmitToolOutputsPollDto) {
            return this.threadsService.submitToolOutputsAndPollThreadRun(params.threadId, params.runId, body);
        }

        @Post(':threadId/runs/:runId/submit_tool_outputs/stream')
        @ApiOperation({ summary: 'Submit tool outputs and stream the run' })
        submitToolOutputsStreamThreadRun(@Param() params: RunIdDto, @Body() body: RunSubmitToolOutputsStreamDto) {
            return this.threadsService.submitToolOutputsStreamThreadRun(params.threadId, params.runId, body);
        }

        // Steps Endpoints
            @Get(':threadId/runs/:runId/steps/:stepId')
            @ApiOperation({ summary: 'Retrieve a specific run step' })
            retrieveThreadRunStep(
            @Param() params: RunStepRetrieveParamsDto,
            @Query() query?: StepRetrieveQueryDto,
            ) {
            return this.threadsService.retrieveThreadRunStep(params.threadId, params.runId, params.stepId, query);
            }

            @Get(':threadId/runs/:runId/steps')
            @ApiOperation({ summary: 'List all steps for a specific run' })
            listThreadRunSteps(
            @Param() params: RunStepsListParamsDto,
            @Query() query?: StepListQueryDto,
            ) {
            return this.threadsService.listThreadRunSteps(params.threadId, params.runId, query);
            }
        
    // Messages Endpoints
        @Post(':threadId/messages')
        @ApiOperation({ summary: 'Create a message for a thread' })
        createThreadMessage(
            @Param('threadId') threadId: string, 
            @Body() body: MessageCreateDto
        ) {
            return this.threadsService.createThreadMessage(threadId, body);
        }
    
        @Get(':threadId/messages/:messageId')
        @ApiOperation({ summary: 'Retrieve a specific message' })
        retrieveThreadMessage(
            @Param() params: MessageRetrieveParamsDto
        ) {
            return this.threadsService.retrieveThreadMessage(params.threadId, params.messageId);
        }
    
        @Post(':threadId/messages/:messageId')
        @ApiOperation({ summary: 'Update a specific message' })
        updateThreadMessage(
            @Param() params: MessageRetrieveParamsDto, 
            @Body() body: MessageUpdateDto
        ) {
            return this.threadsService.updateThreadMessage(params.threadId, params.messageId, body);
        }
    
        @Get(':threadId/messages')
        @ApiOperation({ summary: 'List all messages for a thread' })
        listThreadMessages(
            @Param('threadId') threadId: string, 
            @Query() query?: MessageListQueryDto
        ) {
            return this.threadsService.listThreadMessages(threadId, query);
        }
    
        @Delete(':threadId/messages/:messageId')
        @ApiOperation({ summary: 'Delete a specific message' })
        deleteThreadMessage(
            @Param() params: MessageRetrieveParamsDto
        ) {
            return this.threadsService.deleteThreadMessage(params.threadId, params.messageId);
        }

}
