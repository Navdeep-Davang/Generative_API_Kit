import { ExtendedRequestOptionsDto, ListRunParamsDto, MessageCreateDto, MessageListQueryDto, MessageUpdateDto, RunCreateAndPollDto, RunCreateDto, RunStreamDto, RunSubmitToolOutputsDto, RunSubmitToolOutputsPollDto, RunSubmitToolOutputsStreamDto, RunUpdateDto, StepListQueryDto, StepRetrieveQueryDto, ThreadCreateAndRunDto, ThreadCreateAndRunPollDto, ThreadCreateAndRunStreamDto, ThreadCreateDto, ThreadUpdateDto } from '@/openai/dto/beta/threads/threads.dto';
import { RequestOptionsDto } from '@/openai/dto/openai/RequestOptions/request-options.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';


@Injectable()
export class ThreadsService {
  private openAIClient: OpenAI;
  private readonly threads;

  constructor(private configService: ConfigService) {
    this.openAIClient = new OpenAI({
        apiKey: this.configService.get<string>('OPENAI_API_KEY')
    });

    this.threads = this.openAIClient.beta.threads;
  }

// Threads 7 Services
    createThread(createThreadDto: ThreadCreateDto) {
        const {body, options}= createThreadDto
        return this.threads.create(body, options);
    }

    retrieveThread(threadId: string, options?:RequestOptionsDto) {
        return this.threads.retrieve(threadId, options);
    }

    updateThread(threadId: string, updateThreadDto: ThreadUpdateDto) {
        const {body, options}= updateThreadDto
        return this.threads.update(threadId, body, options);
    }

    deleteThread(threadId: string, options?:RequestOptionsDto) {
        return this.threads.del(threadId, options);
    }

    createAndRunThread(createAndRunDto: ThreadCreateAndRunDto) {
        const {body, options}= createAndRunDto
        return this.threads.createAndRun(body, options);
    }

    createAndRunPollThread(createAndRunPollDto: ThreadCreateAndRunPollDto) {
        const {body, options}= createAndRunPollDto
        return this.threads.createAndRunPoll(body, options);
    }

    createAndRunStreamThread(createAndRunStreamDto: ThreadCreateAndRunStreamDto) {
        const {body, options}= createAndRunStreamDto
        return this.threads.createAndRunStream(body, options);
    }


    // Runs 11 Services
        createRunForThread(threadId: string, runCreateDto: RunCreateDto) {
            const {params, options}= runCreateDto
            return this.threads.runs.create(threadId, params, options);
        }

        retrieveRunForThread(threadId: string, runId: string, options?:RequestOptionsDto) {
            return this.threads.runs.retrieve(threadId, runId, options);
        }

        updateRunForThread(threadId: string, runId: string, runUpdateDto: RunUpdateDto) {
            const {body, options}= runUpdateDto
            return this.threads.runs.update(threadId, runId, body, options);
        }

        listRunsForThread(threadId: string, listRunParamsDto: ListRunParamsDto) {
            const {query, options}= listRunParamsDto
            return this.threads.runs.list(threadId, query, options);
        }

        cancelRunForThread(threadId: string, runId: string, options?:RequestOptionsDto) {
            return this.threads.runs.cancel(threadId, runId, options);
        }

        createAndPollRunForThread(threadId: string, runCreateAndPollDto: RunCreateAndPollDto) {
            const {body, options}= runCreateAndPollDto
            return this.threads.runs.createAndPoll(threadId, body, options);
        }

        pollRunForThread(threadId: string, runId: string, options?: ExtendedRequestOptionsDto) {
            return this.threads.runs.poll(threadId, runId, options);
        }

        streamRunForThread(threadId: string, runStreamDto: RunStreamDto) {
            const {body, options}= runStreamDto
            return this.threads.runs.stream(threadId, body, options);
        }

        submitToolOutputsForRun(threadId: string, runId: string, toolOutputsDto: RunSubmitToolOutputsDto) {
            const {body, options}= toolOutputsDto
            return this.threads.runs.submitToolOutputs(threadId, runId, body, options);
        }

        submitToolOutputsAndPollForRun(threadId: string, runId: string, toolOutputsPollDto: RunSubmitToolOutputsPollDto) {
            const {body, options}= toolOutputsPollDto
            return this.threads.runs.submitToolOutputsAndPoll(threadId, runId, body, options);
        }

        submitToolOutputsStreamForRun(threadId: string, runId: string, toolOutputsStreamDto: RunSubmitToolOutputsStreamDto) {
            const {body, options}= toolOutputsStreamDto
            return this.threads.runs.submitToolOutputsStream(threadId, runId, body, options);
        }

        // Steps 2 Services
            retrieveRunStepForThread(threadId: string, runId: string, stepId: string, stepRetrieveQueryDto: StepRetrieveQueryDto) {
                const {query, options}= stepRetrieveQueryDto
                return this.threads.runs.steps.retrieve(threadId, runId, stepId, query, options);
            }

            listRunStepsForThread(threadId: string, runId: string, stepListQueryDto: StepListQueryDto) {
                const {query, options}= stepListQueryDto
                return this.threads.runs.steps.list(threadId, runId, query, options);
            }

    // Messages 5 Services
        createMessageForThread(threadId: string, messageCreateDto: MessageCreateDto) {
            const {body, options}= messageCreateDto
            return this.threads.messages.create(threadId, body, options);
        }

        retrieveMessageForThread(threadId: string, messageId: string, options?:RequestOptionsDto) {
            return this.threads.messages.retrieve(threadId, messageId, options);
        }

        updateMessageForThread(threadId: string, messageId: string, messageUpdateDto: MessageUpdateDto) {
            const {body, options}= messageUpdateDto
            return this.threads.messages.update(threadId, messageId, body, options);
        }

        listMessagesForThread(threadId: string, messageListQueryDto: MessageListQueryDto) {
            const {query, options}= messageListQueryDto
            return this.threads.messages.list(threadId, query, options);
        }

        deleteMessageForThread(threadId: string, messageId: string, options?:RequestOptionsDto) {
            return this.threads.messages.del(threadId, messageId, options);
        }
}
