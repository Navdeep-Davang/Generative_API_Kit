import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Beta } from 'openai/resources'; // Assuming Beta is the SDK resource for Assistants

@Injectable()
export class AssistantsService {
  private openAIClient: OpenAI;
  private readonly assistants;

  constructor() {
    this.openAIClient = new OpenAI({
      apiKey: 'your-api-key', // Use environment variables for API key or configuration
    });

    this.assistants = new Beta(this.openAIClient).assistants;
  }

  // Create an assistant with model and instructions
  createAssistant(assistantCreateParamsDto: AssistantCreateParamsDto, options?: CoreRequestOptionsDto) {
    return this.assistants.create(assistantCreateParamsDto, options);
  }

  // Retrieve an assistant by ID
  retrieveAssistant(assistantId: string, options?: CoreRequestOptionsDto) {
    return this.assistants.retrieve(assistantId, options);
  }

  // Update an assistant by ID
  updateAssistant(assistantId: string, assistantUpdateParamsDto: AssistantUpdateParamsDto, options?: CoreRequestOptionsDto) {
    return this.assistants.update(assistantId, assistantUpdateParamsDto, options);
  }

  // List all assistants
  listAssistants(query?: AssistantListParamsDto, options?: CoreRequestOptionsDto) {
    return this.assistants.list(query, options);
  }

  // Delete an assistant by ID
  deleteAssistant(assistantId: string, options?: CoreRequestOptionsDto) {
    return this.assistants.del(assistantId, options);
  }
}
