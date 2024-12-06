import { Controller, Post, Get, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AssistantsService } from '../../services/beta/assistants.service'; // Assuming service exists
import { AssistantCreateDto, AssistantListDto, AssistantUpdateDto } from '@/openai/dto/beta/assistants/assistants.dto';
import { RequestOptionsDto } from '@/openai/dto/openai/RequestOptions/request-options.dto';

@ApiTags('Beta - Assistants')
@Controller('beta/assistants')
export class AssistantsController {
  constructor(private readonly assistantsService: AssistantsService) {}

// Assistants 5 Endpoints
    @ApiOperation({ summary: 'Create an assistant with a model and instructions' })
    @Post()
    async createAssistant(
      @Body() body: AssistantCreateDto
    ) {
      return this.assistantsService.createAssistant(body);
    }

    @ApiOperation({ summary: 'Retrieve an assistant by ID' })
    @Get(':assistantId')
    async retrieveAssistant(
      @Param('assistantId') assistantId: string,
      @Body() options?: RequestOptionsDto,
    ) {
      return this.assistantsService.retrieveAssistant(assistantId, options);
    }

    @ApiOperation({ summary: 'Update an assistant by ID' })
    @Patch(':assistantId')
    async updateAssistant(
      @Param('assistantId') assistantId: string,
      @Body() body: AssistantUpdateDto
    ) {
      return this.assistantsService.updateAssistant(assistantId, body);
    }

    @ApiOperation({ summary: 'List all assistants' })
    @Get()
    async listAssistants(
      @Body() body: AssistantListDto
    ) {
      return this.assistantsService.listAssistants(body);
    }

    @ApiOperation({ summary: 'Delete an assistant by ID' })
    @Delete(':assistantId')
    async deleteAssistant(
      @Param('assistantId') assistantId: string,
      @Body() options?: RequestOptionsDto,
    ) {
      return this.assistantsService.deleteAssistant(assistantId, options);
    }
}
