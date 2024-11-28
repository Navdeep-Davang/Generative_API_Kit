import { Controller, Post, Get, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AssistantsService } from '../../services/beta/assistants.service'; // Assuming service exists

@ApiTags('Beta - Assistants')
@Controller('assistants')
export class AssistantsController {
  constructor(private readonly assistantsService: AssistantsService) {}

  @ApiOperation({ summary: 'Create an assistant with a model and instructions' })
  @Post()
  createAssistant(
    @Body() body: AssistantCreateParamsDto, // DTO for AssistantCreateParams
    @Query() options?: CoreRequestOptionsDto, // DTO for Core.RequestOptions
  ) {
    return this.assistantsService.createAssistant(body, options);
  }

  @ApiOperation({ summary: 'Retrieve an assistant by ID' })
  @Get(':assistantId')
  retrieveAssistant(
    @Param('assistantId') assistantId: string,
    @Query() options?: CoreRequestOptionsDto,
  ) {
    return this.assistantsService.retrieveAssistant(assistantId, options);
  }

  @ApiOperation({ summary: 'Update an assistant by ID' })
  @Patch(':assistantId')
  updateAssistant(
    @Param('assistantId') assistantId: string,
    @Body() body: AssistantUpdateParamsDto, // DTO for AssistantUpdateParams
    @Query() options?: CoreRequestOptionsDto,
  ) {
    return this.assistantsService.updateAssistant(assistantId, body, options);
  }

  @ApiOperation({ summary: 'List all assistants' })
  @Get()
  listAssistants(
    @Query() query?: AssistantListParamsDto, // DTO for AssistantListParams
    @Query() options?: CoreRequestOptionsDto,
  ) {
    return this.assistantsService.listAssistants(query, options);
  }

  @ApiOperation({ summary: 'Delete an assistant by ID' })
  @Delete(':assistantId')
  deleteAssistant(
    @Param('assistantId') assistantId: string,
    @Query() options?: CoreRequestOptionsDto,
  ) {
    return this.assistantsService.deleteAssistant(assistantId, options);
  }
}
