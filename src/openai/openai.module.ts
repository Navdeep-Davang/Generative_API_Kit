import { Module } from '@nestjs/common';
import { OpenAIController } from './controllers/openai.controller';
import { OpenAIService } from './services/openai.service';
import { BetaModule } from './modules/beta/beta.module';


@Module({
  controllers: [OpenAIController],
  providers: [OpenAIService],
  imports: [BetaModule],
  exports: [OpenAIService],
})
export class OpenAIModule {}