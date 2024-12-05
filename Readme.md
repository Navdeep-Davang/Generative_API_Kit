# Generative API Kit - Documentation

### Overview

The **Generative API Kit&#x20;**&#x69;s a NestJS-based application that integrates with both the Mistral and OpenAI SDKs. It provides structured  Zod Validated endpoints for various generative AI functionalities using, such as chat completions, embeddings, file management, and more. The application is modular, ensuring clear separation between Mistral and OpenAI implementations, with extensive usage of DTOs and schemas for validation using Zod.

***

### Directory Structure

#### Mistral Integration

* **`mistral/`**: Main module for Mistral SDK integrations.
  * **`dto/`**: Contains Data Transfer Objects (DTOs) organized by functionality.
    * **Agents**
      * `agents.dto.ts`
    * **Batch Jobs**
      * `batch-jobs.dto.ts`
    * **Chat**
      * `chat.dto.ts`
    * **Classifiers**
      * `classifiers.dto.ts`
    * **Embeddings**
      * `embeddings.dto.ts`
    * **Files**
      * `files.dto.ts`
    * **Fim**
      * `fim.dto.ts`
    * **FineTuning**
      * `finetuning-jobs.dto.ts`
    * **Models**
      * `models.dto.ts`
    * **RequestOptions**
      * `schema/RequestOptionsSchema.ts`
      * `request-options.dto.ts`
  * **`mistral.controller.ts`**: Handles API requests for Mistral services.
  * **`mistral.module.ts`**: Module declaration for Mistral-related services.
  * **`mistral.service.ts`**: Core service layer implementing Mistral SDK functionality.

***

#### OpenAI Integration

* **`openai/`**: Main module for OpenAI SDK integrations.
  * **`modules/`**: Module definitions for organizing OpenAI services.
    * **Beta Module**
      * `beta.module.ts`
    * **OpenAI Module**
      * `openai.module.ts`
  * **`dto/`**: Extensive DTO definitions grouped into feature categories.
    * **Beta DTOs**
      * **Assistants**
        * `assistants.dto.ts`
        * `schema/AssistantCreateSchema.ts`,`AssistantListSchema.ts`, etc.
      * **Chat**
        * `chat.dto.ts`
        * `schema/ChatCompletionCreateParamsBaseSchema.ts`, etc.
      * **Threads**
        * `threads.dto.ts`
        * `schema/ThreadCreateParamsSchema.ts`, etc.
      * **Vector Stores**
        * `vector-stores.dto.ts`
        * `schema/CreateVectorStoreSchema.ts`, etc.
    * **Core DTOs**
      * **Audio**,**Batches**,**Completions**,**Embeddings**,**Files**,**FineTuning**,**Images**,**Moderations**,**RequestOptions**,**Uploads**
  * **`controllers/`**: Organized by beta features and primary functionalities.
    * **Beta Controllers**
      * `assistants.controller.ts`
      * `chat.controller.ts`
      * `threads.controller.ts`
      * `vector-stores.controller.ts`
    * **Main Controller**
      * `openai.controller.ts`
  * **`services/`**: Implements the business logic for OpenAI interactions.
    * **Beta Services**
      * `assistants.service.ts`
      * `chat.service.ts`
      * `threads.service.ts`
      * `vector-stores.service.ts`
    * **Main Service**
      * `openai.service.ts`

***

#### Root Files

* **`app.module.ts`**: Main application module.
* **`main.ts`**: Application entry point.

***

### Features

* **Mistral SDK Integration**:
  * Text Generation
  * Vision
  * Code Generation
  * Embeddings
  * Function Calling
  * JSON Mode
  * Moderation
  * Fine-tuning
  * Agents
  * Batch Inference
* **OpenAI SDK Integration**:
  * Audio
  * Chat
  * Embeddings
  * Fine-tuning
  * Batch
  * Files
  * Uploads
  * Images
  * Models
  * Moderations
  * Assistants
  * Threads
  * Messages
  * Runs
  * Run steps
  * Vector stores
  * Vector store files
  * Vector store file batches
  * Streaming

### Validation

All DTOs are validated using **Zod&#x20;**&#x73;chemas to ensure data integrity and type safety for incoming API requests.

***

### How to Use

1. **Installation**: Clone the repository and install dependencies.
2. **Configuration**: Set up environment variables for Mistral and OpenAI SDKs.
3. **Run the Server**: Use `npm run start` to start the NestJS application.

This provides a scalable structure for integrating generative AI capabilities into any project using NestJS.
