import { Module } from '@nestjs/common';
import { OpenAIController } from './controllers/openai.controller';
import { OpenAIService } from './openai.service';

@Module({
  controllers: [OpenAIController],
  providers: [OpenAIService],
  exports: [OpenAIService],
})
export class OpenAIModule {}