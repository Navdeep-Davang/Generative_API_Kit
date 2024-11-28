import { Module } from '@nestjs/common';
import { AssistantsController } from '../../controllers/beta/assistants.controller';
import { ChatController } from '../../controllers/beta/chat.controller';
import { ThreadsController } from '../../controllers/beta/threads.controller';
import { VectorStoresController } from '../../controllers/beta/vector-stores.controller';

import { AssistantsService } from '../../services/beta/assistants.service';
import { ChatService } from '../../services/beta/chat.service';
import { ThreadsService } from '../../services/beta/threads.service';
import { VectorStoresService } from '../../services/beta/vector-stores.service';

@Module({
  controllers: [
    AssistantsController,   // Handles '/openai/beta/assistants' routes
    ChatController,         // Handles '/openai/beta/chat' routes
    ThreadsController,      // Handles '/openai/beta/threads' routes
    VectorStoresController, // Handles '/openai/beta/vector-stores' routes
  ],
  providers: [
    AssistantsService,   // Provide service for AssistantsController
    ChatService,         // Provide service for ChatController
    ThreadsService,      // Provide service for ThreadsController
    VectorStoresService, // Provide service for VectorStoresController
  ],
})
export class BetaModule {}
