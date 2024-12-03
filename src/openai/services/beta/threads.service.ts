import { ThreadCreateAndRunDto, ThreadCreateDto, ThreadUpdateDto } from '@/openai/dto/beta/threads/threads.dto';
import { RequestOptionsDto } from '@/openai/dto/openai/RequestOptions/request-options.dto';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Beta } from 'openai/resources';

@Injectable()
export class ThreadsService {
  private openAIClient: OpenAI;
  private readonly threads;

  constructor() {
    this.openAIClient = new OpenAI({
      apiKey: 'your-api-key', // Use environment variables for API key or configuration
    });

    this.threads = new Beta(this.openAIClient).threads;
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
        return this.threads.createAndRunPoll(createAndRunPollDto);
    }

    createAndRunStreamThread(createAndRunStreamDto: ThreadCreateAndRunStreamDto) {
        return this.threads.createAndRunStream(createAndRunStreamDto);
    }


    // Runs 11 Services
        createRunForThread(threadId: string, runCreateDto: RunCreateDto) {
            return this.threads.runs.create(threadId, runCreateDto);
        }

        retrieveRunForThread(threadId: string, runId: string) {
            return this.threads.runs.retrieve(threadId, runId);
        }

        updateRunForThread(threadId: string, runId: string, runUpdateDto: RunUpdateDto) {
            return this.threads.runs.update(threadId, runId, runUpdateDto);
        }

        listRunsForThread(threadId: string, query: RunListParamsDto) {
            return this.threads.runs.list(threadId, query);
        }

        cancelRunForThread(threadId: string, runId: string) {
            return this.threads.runs.cancel(threadId, runId);
        }

        createAndPollRunForThread(threadId: string, runCreateAndPollDto: RunCreateAndPollDto) {
            return this.threads.runs.createAndPoll(threadId, runCreateAndPollDto);
        }

        pollRunForThread(threadId: string, runId: string, options: { pollIntervalMs?: number }) {
            return this.threads.runs.poll(threadId, runId, options);
        }

        streamRunForThread(threadId: string, runStreamDto: RunStreamDto) {
            return this.threads.runs.stream(threadId, runStreamDto);
        }

        submitToolOutputsForRun(threadId: string, runId: string, toolOutputsDto: RunSubmitToolOutputsDto) {
            return this.threads.runs.submitToolOutputs(threadId, runId, toolOutputsDto);
        }

        submitToolOutputsAndPollForRun(threadId: string, runId: string, toolOutputsPollDto: RunSubmitToolOutputsPollDto) {
            return this.threads.runs.submitToolOutputsAndPoll(threadId, runId, toolOutputsPollDto);
        }

        submitToolOutputsStreamForRun(threadId: string, runId: string, toolOutputsStreamDto: RunSubmitToolOutputsStreamDto) {
            return this.threads.runs.submitToolOutputsStream(threadId, runId, toolOutputsStreamDto);
        }

        // Steps 2 Services
            retrieveRunStepForThread(threadId: string, runId: string, stepId: string, query?: StepRetrieveQueryDto) {
                return this.threads.runs.steps.retrieve(threadId, runId, stepId, query);
            }

            listRunStepsForThread(threadId: string, runId: string, query?: StepListQueryDto) {
                return this.threads.runs.steps.list(threadId, runId, query);
            }

    // Messages 5 Services
        createMessageForThread(threadId: string, messageCreateDto: MessageCreateDto) {
            return this.threads.messages.create(threadId, messageCreateDto);
        }

        retrieveMessageForThread(threadId: string, messageId: string) {
            return this.threads.messages.retrieve(threadId, messageId);
        }

        updateMessageForThread(threadId: string, messageId: string, messageUpdateDto: MessageUpdateDto) {
            return this.threads.messages.update(threadId, messageId, messageUpdateDto);
        }

        listMessagesForThread(threadId: string, query?: MessageListQueryDto) {
            return this.threads.messages.list(threadId, query);
        }

        deleteMessageForThread(threadId: string, messageId: string) {
            return this.threads.messages.del(threadId, messageId);
        }
}
