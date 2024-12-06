import { AssistantCreateDto, AssistantListDto, AssistantUpdateDto } from '@/openai/dto/beta/assistants/assistants.dto';
import { RequestOptionsDto } from '@/openai/dto/openai/RequestOptions/request-options.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';


@Injectable()
export class AssistantsService {
  private openAIClient: OpenAI;
  private readonly assistants;

  constructor(private configService: ConfigService) {
    this.openAIClient = new OpenAI({
        apiKey: this.configService.get<string>('OPENAI_API_KEY')
    });

    this.assistants = this.openAIClient.beta.assistants;
  }

  // Create an assistant with model and instructions
  createAssistant(assistantCreateParamsDto: AssistantCreateDto) {
    const {body, options} = assistantCreateParamsDto
    return this.assistants.create(body, options);
  }

  // Retrieve an assistant by ID
  retrieveAssistant(assistantId: string, options?: RequestOptionsDto) {
    return this.assistants.retrieve(assistantId, options);
  }

  // Update an assistant by ID
  updateAssistant(assistantId: string, assistantUpdateParamsDto: AssistantUpdateDto) {
    const {body, options} = assistantUpdateParamsDto
    return this.assistants.update(assistantId, body, options);
  }

  // List all assistants
  listAssistants(assistantListDto: AssistantListDto) {
    const {query, options} = assistantListDto
    return this.assistants.list(query, options);
  }

  // Delete an assistant by ID
  deleteAssistant(assistantId: string, options?: RequestOptionsDto) {
    return this.assistants.del(assistantId, options);
  }
}
